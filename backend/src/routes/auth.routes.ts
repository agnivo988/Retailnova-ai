import { Router } from 'express';
import { prisma } from '../config/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required' });
    }

    const user = await prisma.user.findUnique({ 
      where: { email },
      include: { role: true }
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role.name },
      process.env.JWT_SECRET || 'retailnova_secret',
      { expiresIn: '24h' }
    );

    res.json({ 
      success: true, 
      token, 
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role.name
      } 
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { email, password, name, roleName } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Find or create role
    let role = await prisma.role.findUnique({ where: { name: roleName || 'staff' } });
    if (!role) {
      role = await prisma.role.create({ data: { name: roleName || 'staff', permissions: [] } });
    }

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        roleId: role.id
      }
    });

    res.status(201).json({ success: true, data: { id: user.id, email: user.email, name: user.name } });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;

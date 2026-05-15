import axios from 'axios';

async function testAI() {
  try {
    const res = await axios.post('http://localhost:8000/api/v1/voice-assistant', {
      text: 'Testing system connectivity',
      language: 'en'
    });
    console.log('✅ AI Service Response:', res.data);
  } catch (error: any) {
    console.error('❌ AI Service Failed:', error.message);
  }
}

testAI();

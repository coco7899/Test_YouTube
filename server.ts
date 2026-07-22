import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Lazy-initialized Gemini AI client
  const getGenAI = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  };

  // API Health Endpoint
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // API Endpoint to Generate Custom Plan via Gemini with seamless fallback
  app.post('/api/generate-plan', async (req, res) => {
    const { keyword, visualStyle = 'Realistic Style' } = req.body;
    const cleanTopic = (keyword || '생성형 AI 활용법 및 1인 비즈니스').replace(/^#/, '');

    try {
      const ai = getGenAI();
      if (ai) {
        const prompt = `
You are a top-tier YouTube content strategist and scriptwriter specializing in Korean AI video creation.
Generate a complete, high-converting content plan for the topic: "${cleanTopic}".
The user's preferred visual style is: "${visualStyle}".

Respond in strictly valid JSON format with the following keys and structure (all text in Korean except imagePrompt which should be in detailed English):

{
  "recommendedTitle": "YouTube title in Korean for ${cleanTopic}",
  "coreHypothesis": "Core hypothesis about audience psychology regarding ${cleanTopic} in Korean (2 sentences)",
  "extractedConcept": "Core concept & action strategy for ${cleanTopic} in Korean (2 sentences)",
  "storylines": [
    {"title": "1. 왕초보 입문법", "desc": "${cleanTopic} 핵심 개념과 5분 만에 시작하는 방법"},
    {"title": "2. 핵심 실전 워크플로우", "desc": "실제 사례로 보는 ${cleanTopic} 실전 가이드"},
    {"title": "3. 수익화 및 자동화", "desc": "${cleanTopic}로 30일 만에 성과 내는 파이프라인"}
  ],
  "psychologyTriggers": [
    {"trigger": "FOMO (소외 공포)", "reason": "'남들은 이미 ${cleanTopic}(으)로 앞서가고 있다'는 긴박감 부여"},
    {"trigger": "낮은 진입 장벽", "reason": "'자본금 0원, 코딩 몰라도 누구나 즉시 실행 가능' 강조"}
  ],
  "hookPhrases": [
    "아직도 ${cleanTopic} 수동으로 하세요? 이 알고리즘이면 10배 빨라집니다!",
    "퇴근 후 10분, ${cleanTopic} 하나로 월 100만원 부수입 만드는 법!",
    "아무도 안 가르쳐주는 ${cleanTopic} 떡상 공식, 지금 바로 공개합니다!",
    "초보자도 100% 성공하는 ${cleanTopic} AI 3단계 가이드!"
  ],
  "estimatedViews": "120k+",
  "totalDuration": "58s",
  "scenes": [
    {
      "sceneNumber": 1,
      "sceneTitle": "Hook",
      "timeRange": "00:00 - 00:05",
      "scriptText": "아직도 ${cleanTopic} 수동으로 작업하시나요? 이 툴 하나면 작업 시간이 10분으로 줄어듭니다.",
      "textOverlay": "수동 작업은 이제 끝! (Motion: Slide Up)",
      "motionEffect": "Slide Up",
      "imagePrompt": "Cinematic portrait of a creator using futuristic glowing AI hologram dashboard for ${cleanTopic}, 8k resolution, professional lighting"
    },
    {
      "sceneNumber": 2,
      "sceneTitle": "Problem",
      "timeRange": "00:05 - 00:15",
      "scriptText": "매일 똑같이 반복되는 번거로운 작업들, 사실 AI로 100% 자동화할 수 있다는 사실을 알고 계셨나요?",
      "textOverlay": "왜 나만 고생했을까? (Motion: Heartbeat)",
      "motionEffect": "Heartbeat",
      "imagePrompt": "Frustrated office worker overwhelmed by charts and screens, transitioning into clear futuristic digital space"
    },
    {
      "sceneNumber": 3,
      "sceneTitle": "Solution",
      "timeRange": "00:15 - 00:45",
      "scriptText": "첫째, 주제를 수집하세요. 둘째, AI 프롬프트로 대본을 뽑으세요. 비용은 0원, 결과물은 완벽합니다.",
      "textOverlay": "0원 비용, 100점 결과! (Motion: Glow Fade In)",
      "motionEffect": "Glow Fade In",
      "imagePrompt": "High-tech workspace with laptop generating viral video thumbnails and creative scripts instantly, ultra detailed"
    }
  ],
  "thumbnailOverlays": {
    "overlayTop": "${cleanTopic} 종결!",
    "overlayBottom": "0원 AI 자동화 🚀"
  }
}
        `;

        const response = await ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });

        const responseText = response.text || '{}';
        const parsedData = JSON.parse(responseText);

        return res.json({
          success: true,
          data: parsedData,
          source: 'gemini',
        });
      }
    } catch (err: any) {
      console.warn('Gemini API Warning, falling back to smart dynamic generator:', err?.message);
    }

    // Dynamic smart fallback matching cleanTopic
    const fallbackData = {
      recommendedTitle: `무자본 0원으로 끝내는 ${cleanTopic} 종결 가이드`,
      coreHypothesis: `시청자들은 ${cleanTopic}에 대해 복잡한 이론보다 당장 오늘 실행해서 결과를 낼 수 있는 실전 템플릿과 노하우를 갈망하고 있습니다.`,
      extractedConcept: `"${cleanTopic} 핵심 워크플로우" - 초보자 눈높이에 맞춘 3단계 실천 로드맵으로 3초 만에 이탈을 막고 몰입감을 극대화합니다.`,
      storylines: [
        {
          title: '1. 왕초보 입문법',
          desc: `무료 AI 도구로 10분 만에 ${cleanTopic} 초안 완성하는 방법`,
        },
        {
          title: '2. 실제 성과 및 사례',
          desc: `1인 크리에이터가 ${cleanTopic} 주제로 조회수 10배 늘린 실제 데이터`,
        },
        {
          title: '3. 수익화 및 자동화',
          desc: `하루 15분 투자로 지속 가능한 파이프라인 구축하기`,
        },
      ],
      psychologyTriggers: [
        {
          trigger: 'FOMO (소외 공포)',
          reason: `'남들은 이미 ${cleanTopic}(으)로 시간 절약하고 수익 올리는 중'이라는 실시간 트렌드 자극`,
        },
        {
          trigger: '낮은 진입 장벽',
          reason: `'컴맹도 5분 만에 따라하는 초간단 도구 가이드'로 실행력 극대화`,
        },
      ],
      hookPhrases: [
        `아직도 ${cleanTopic} 수동으로 하세요? 이 툴 하나면 10분 만에 끝납니다!`,
        `퇴근 후 10분 투자로 ${cleanTopic} 완성하는 2026년형 비밀 공식!`,
        `남들 몰래 쓸어담는 ${cleanTopic} 떡상 공법, 바로 공개합니다!`,
        `0원으로 시작하는 ${cleanTopic} 초보자 완벽 가이드!`,
      ],
      estimatedViews: '85k+',
      totalDuration: '58s',
      scenes: [
        {
          sceneNumber: 1,
          sceneTitle: 'Hook',
          timeRange: '00:00 - 00:05',
          scriptText: `아직도 ${cleanTopic} 수동으로 작업하시나요? 이 알고리즘 하나면 작업 시간이 10분으로 줄어듭니다.`,
          textOverlay: `수동 작업은 이제 끝! (Motion: Slide Up)`,
          motionEffect: 'Slide Up',
          imagePrompt: `Cinematic lighting of creator working on ${cleanTopic} digital content, ultra-high resolution`,
        },
        {
          sceneNumber: 2,
          sceneTitle: 'Problem',
          timeRange: '00:05 - 00:15',
          scriptText: `매일 반복되는 번거로운 가공 작업들, 사실 AI로 자동화하면 몇 초 만에 처리할 수 있습니다.`,
          textOverlay: `왜 나만 몰랐을까? (Motion: Heartbeat)`,
          motionEffect: 'Heartbeat',
          imagePrompt: `Glow neon interface depicting automated video workflow and scripts for ${cleanTopic}`,
        },
        {
          sceneNumber: 3,
          sceneTitle: 'Solution',
          timeRange: '00:15 - 00:45',
          scriptText: `첫째, 주제를 선정하세요. 둘째, 프롬프트로 대본을 생성하세요. 셋째, 원클릭으로 썸네일까지 완성하세요.`,
          textOverlay: `0원 비용, 100점 결과! (Motion: Glow Fade In)`,
          motionEffect: 'Glow Fade In',
          imagePrompt: `Futuristic AI creator studio generating viral shortform videos automatically`,
        },
      ],
      thumbnailOverlays: {
        overlayTop: `${cleanTopic} 종결!`,
        overlayBottom: '0원 AI 자동화 🚀',
      },
    };

    res.json({
      success: true,
      data: fallbackData,
      source: 'smart-fallback',
    });
  });

  // Vite development vs production static serve
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Creator Hub AI] Express + Vite server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();

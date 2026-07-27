import axios from'axios';import{candidates,history}from'../data/mock';
export const api=axios.create({baseURL:'/api/v1',timeout:8000});
const mock=(data,ms=500)=>new Promise(r=>setTimeout(()=>r({data}),ms));
export const candidateService={list:()=>mock(candidates),get:id=>mock(candidates.find(c=>c.id===id)||candidates[0]),history:()=>mock(history),parseResume:()=>mock({skills:['React','TypeScript','Python','FastAPI'],education:'BS Computer Science — FAST NUCES, 2025',experience:candidates[0].experience})};
export const reportService={generate:ids=>mock({id:'RPT-2026-041',candidateIds:ids,createdAt:new Date().toISOString()})};

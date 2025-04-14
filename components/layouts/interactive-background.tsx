'use client';

import { useRef, useEffect } from 'react';

export default function InteractiveBackground() {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // 캔버스 크기 설정
    const setCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // 파티클 클래스 정의
    class Particle {
      constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.baseX = x;
        this.baseY = y;
        this.density = (Math.random() * 10) + 2;
        this.distance = 75;
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
      
      update(mouseX, mouseY) {
        // 마우스 위치와의 거리 계산
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // 마우스에서 멀어지는 힘
        if (distance < this.distance) {
          const forceX = dx / distance;
          const forceY = dy / distance;
          const force = (this.distance - distance) / this.distance;
          
          this.x -= forceX * force * this.density;
          this.y -= forceY * force * this.density;
        }
        
        // 원래 위치로 돌아가는 힘
        const returnForce = 0.05; // 돌아가는 속도 조절
        
        const dxBase = this.baseX - this.x;
        const dyBase = this.baseY - this.y;
        
        this.x += dxBase * returnForce;
        this.y += dyBase * returnForce;
        
        // 그리기
        ctx.fillStyle = this.color;
        this.draw();
      }
    }
    
    // 파티클 생성
    let particleArray = [];
    const createParticles = () => {
      particleArray = [];
      const gridSize = 30;
      
      for (let x = 0; x < width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
          if (Math.random() < 0.2) { // 모든 그리드에 파티클을 생성하지 않고 일부만 생성
            const size = Math.random() * 1.5 + 0.5;
            
            // 파티클 색상 랜덤 선택 (청록색, 보라색, 파란색 계열)
            const colorPalette = [
              'rgba(44, 130, 201, 0.4)', // 파란색
              'rgba(94, 114, 228, 0.3)', // 청록색
              'rgba(156, 66, 245, 0.3)' // 보라색
            ];
            
            const randomColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            
            particleArray.push(new Particle(x, y, size, randomColor));
          }
        }
      }
    };
    
    createParticles();
    window.addEventListener('resize', createParticles);
    
    // 마우스 위치 추적
    let mouseX = null;
    let mouseY = null;
    
    const handleMouseMove = (e) => {
      mouseX = e.x;
      mouseY = e.y;
    };
    
    const handleMouseOut = () => {
      mouseX = null;
      mouseY = null;
    };
    
    const handleTouchStart = (e) => {
      mouseX = e.touches[0].clientX;
      mouseY = e.touches[0].clientY;
    };
    
    const handleTouchMove = (e) => {
      mouseX = e.touches[0].clientX;
      mouseY = e.touches[0].clientY;
    };
    
    const handleTouchEnd = () => {
      mouseX = null;
      mouseY = null;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
    
    // 연결선 그리기
    const connectParticles = () => {
      for (let i = 0; i < particleArray.length; i++) {
        for (let j = i; j < particleArray.length; j++) {
          const dx = particleArray[i].x - particleArray[j].x;
          const dy = particleArray[i].y - particleArray[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 - distance/120 * 0.2})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particleArray[i].x, particleArray[i].y);
            ctx.lineTo(particleArray[j].x, particleArray[j].y);
            ctx.stroke();
          }
        }
      }
    };
    
    // 애니메이션 프레임
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update(mouseX, mouseY);
      }
      
      connectParticles();
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // 정리 함수
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('resize', createParticles);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className='fixed top-0 left-0 w-screen h-screen -z-5 opacity-40 pointer-events-none'
      style={{ position: 'fixed', top: 0, left: 0 }}
    />
  );
}

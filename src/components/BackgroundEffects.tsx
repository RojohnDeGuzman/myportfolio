export function BackgroundEffects() {
  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* Base gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(249, 115, 22, 0.15), transparent), radial-gradient(ellipse 60% 40% at 100% 50%, rgba(249, 115, 22, 0.08), transparent 50%), radial-gradient(ellipse 50% 30% at 0% 80%, rgba(249, 115, 22, 0.06), transparent 50%)',
        }}
      />
      {/* Animated orbs */}
      <div
        className="bg-orb bg-orb-1"
        style={{
          position: 'absolute',
          width: 'min(90vw, 600px)',
          height: 'min(90vw, 600px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.2) 0%, rgba(249, 115, 22, 0.05) 40%, transparent 70%)',
          filter: 'blur(40px)',
          top: '-20%',
          left: '-10%',
          animation: 'float1 14s ease-in-out infinite',
        }}
      />
      <div
        className="bg-orb bg-orb-2"
        style={{
          position: 'absolute',
          width: 'min(70vw, 450px)',
          height: 'min(70vw, 450px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.15) 0%, rgba(249, 115, 22, 0.03) 50%, transparent 70%)',
          filter: 'blur(50px)',
          top: '40%',
          right: '-15%',
          animation: 'float2 18s ease-in-out infinite',
        }}
      />
      <div
        className="bg-orb bg-orb-3"
        style={{
          position: 'absolute',
          width: 'min(60vw, 380px)',
          height: 'min(60vw, 380px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.12) 0%, transparent 60%)',
          filter: 'blur(45px)',
          bottom: '-10%',
          left: '20%',
          animation: 'float3 16s ease-in-out infinite',
        }}
      />
      {/* Soft vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgba(10, 10, 11, 0.4) 100%)',
        }}
      />
      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(12%, 18%) scale(1.12); }
          66% { transform: translate(-10%, -12%) scale(0.92); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-18%, -14%) scale(1.15); }
          66% { transform: translate(14%, 12%) scale(0.88); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(14%, -16%) scale(1.14); }
        }
        @media (prefers-reduced-motion: reduce) {
          .bg-orb { animation: none !important; }
        }
      `}</style>
    </div>
  )
}

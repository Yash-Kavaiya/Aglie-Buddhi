import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from "remotion";

// Scene 1: Logo fades in (0-60 frames, 2 seconds)
const LogoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 45], [0, 1], {
    extrapolateRight: "clamp",
  });

  const scale = spring({
    frame,
    fps,
    config: {
      damping: 200,
      stiffness: 100,
      mass: 0.5,
    },
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          opacity,
          transform: `scale(${scale})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        <div
          style={{
            width: 180,
            height: 180,
            borderRadius: "50%",
            border: "6px solid white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: 80,
              fontWeight: "bold",
              color: "white",
              fontFamily: "Arial, sans-serif",
            }}
          >
            AB
          </span>
        </div>
        <span
          style={{
            fontSize: 48,
            color: "white",
            fontFamily: "Arial, sans-serif",
            fontWeight: 300,
            letterSpacing: 8,
          }}
        >
          AGILE BUDDHI
        </span>
      </div>
    </AbsoluteFill>
  );
};

// Scene 2: Bullet points animate from right (60-240 frames, 6 seconds)
const BulletsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bullets = [
    "AI-Powered DevOps Automation",
    "18+ MCP Server Integrations",
    "Intelligent Incident Response",
  ];

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 80,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 60,
          width: "100%",
        }}
      >
        {bullets.map((text, index) => {
          const delay = index * 20;
          const slideProgress = spring({
            frame: frame - delay,
            fps,
            config: {
              damping: 50,
              stiffness: 100,
              mass: 0.8,
            },
          });

          const opacity = interpolate(frame - delay, [0, 15], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          const translateX = interpolate(slideProgress, [0, 1], [400, 0]);

          return (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 30,
                opacity,
                transform: `translateX(${translateX}px)`,
              }}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: "white",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: 52,
                  color: "white",
                  fontFamily: "Arial, sans-serif",
                  fontWeight: 500,
                }}
              >
                {text}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Scene 3: CTA pulses and holds (240-360 frames, 4 seconds)
const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Fade in
  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Continuous pulse effect
  const pulse = Math.sin(frame * 0.15) * 0.08 + 1;

  // Glow intensity oscillates
  const glowIntensity = Math.sin(frame * 0.15) * 10 + 20;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          opacity,
          transform: `scale(${pulse})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "40px 80px",
            borderRadius: 16,
            boxShadow: `0 0 ${glowIntensity}px rgba(255, 255, 255, 0.5)`,
          }}
        >
          <span
            style={{
              fontSize: 56,
              color: "black",
              fontFamily: "Arial, sans-serif",
              fontWeight: 700,
            }}
          >
            Get Started Now
          </span>
        </div>
        <span
          style={{
            fontSize: 36,
            color: "rgba(255, 255, 255, 0.8)",
            fontFamily: "Arial, sans-serif",
          }}
        >
          agilebuddhi.com
        </span>
      </div>
    </AbsoluteFill>
  );
};

// Main composition
export const PromoVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {/* Scene 1: Logo fade-in (0-2 seconds) */}
      <Sequence from={0} durationInFrames={60}>
        <LogoScene />
      </Sequence>

      {/* Scene 2: Bullet points (2-8 seconds) */}
      <Sequence from={60} durationInFrames={180}>
        <BulletsScene />
      </Sequence>

      {/* Scene 3: CTA pulse (8-12 seconds) */}
      <Sequence from={240} durationInFrames={120}>
        <CTAScene />
      </Sequence>
    </AbsoluteFill>
  );
};

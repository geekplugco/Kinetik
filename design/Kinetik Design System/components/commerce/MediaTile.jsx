import React from 'react';

/**
 * Media tile — the hover-to-play product media frame.
 * If `src` is an image it renders it; if `videoSrc` is given, it plays on hover
 * (muted, looped, inline). With neither, it renders a branded placeholder so
 * layouts hold their shape before real media is dropped in.
 */
export function MediaTile({
  src,
  videoSrc,
  alt = '',
  ratio = '4 / 5',
  code,
  tone = 'light',
  rounded = false,
  children,
  style,
  ...rest
}) {
  const videoRef = React.useRef(null);
  const isDark = tone === 'dark';

  const onEnter = () => { const v = videoRef.current; if (v) { v.currentTime = 0; v.play?.(); } };
  const onLeave = () => { const v = videoRef.current; if (v) { v.pause?.(); } };

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        position: 'relative', aspectRatio: ratio, overflow: 'hidden',
        background: isDark ? 'var(--ink-900)' : 'var(--ink-100)',
        borderRadius: rounded ? 'var(--radius-lg)' : 'var(--radius-0)',
        ...style,
      }}
      {...rest}
    >
      {src && (
        <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
      )}
      {videoSrc && (
        <video ref={videoRef} src={videoSrc} muted loop playsInline preload="metadata"
          style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
      )}
      {!src && !videoSrc && (
        // Branded placeholder — exposed-grid feel
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundImage: isDark
            ? 'linear-gradient(var(--ink-800) 1px, transparent 1px), linear-gradient(90deg, var(--ink-800) 1px, transparent 1px)'
            : 'linear-gradient(var(--ink-150) 1px, transparent 1px), linear-gradient(90deg, var(--ink-150) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
            color: isDark ? 'var(--ink-500)' : 'var(--ink-400)',
          }}>{code || 'Media'}</span>
        </div>
      )}
      {children}
    </div>
  );
}

if (!customElements.get('hero-video')) {
  customElements.define(
    'hero-video',
    class HeroVideo extends HTMLElement {
      connectedCallback() {
        this.reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
        this.host = this.querySelector('[data-video-host]');
        this.native = this.querySelector('video');
        this.toggle = this.querySelector('[data-video-toggle]');
        this.loaded = false;
        this.playing = false;

        if (this.native) {
          if (this.reduce.matches) this.native.pause();
          else this.playing = true;
        } else if (this.host) {
          if (!this.reduce.matches && 'IntersectionObserver' in window) {
            const io = new IntersectionObserver(
              (entries) => {
                entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                    this.loadEmbed();
                    io.disconnect();
                  }
                });
              },
              { rootMargin: '200px' }
            );
            io.observe(this);
          }
        } else if (this.toggle) {
          this.toggle.classList.add('hidden');
        }

        if (this.toggle) {
          this.toggle.addEventListener('click', () => (this.playing ? this.pause() : this.play()));
          this.syncToggle();
        }
      }

      loadEmbed() {
        if (this.loaded || !this.host || !this.host.dataset.embedSrc) return;
        this.loaded = true;
        const frame = document.createElement('iframe');
        frame.src = this.host.dataset.embedSrc;
        frame.allow = 'autoplay; encrypted-media; picture-in-picture';
        frame.title = this.host.dataset.title || 'Background video';
        frame.setAttribute('frameborder', '0');
        frame.setAttribute('tabindex', '-1');
        frame.setAttribute('aria-hidden', 'true');
        this.host.appendChild(frame);
        this.host.classList.remove('opacity-0');
        this.playing = true;
        this.syncToggle();
      }

      message(cmd) {
        const frame = this.host && this.host.querySelector('iframe');
        if (!frame || !frame.contentWindow) return;
        const payload =
          this.host.dataset.provider === 'youtube'
            ? JSON.stringify({ event: 'command', func: cmd === 'play' ? 'playVideo' : 'pauseVideo', args: [] })
            : JSON.stringify({ method: cmd });
        frame.contentWindow.postMessage(payload, '*');
      }

      play() {
        if (this.native) this.native.play();
        else if (!this.loaded) this.loadEmbed();
        else this.message('play');
        this.playing = true;
        this.syncToggle();
      }

      pause() {
        if (this.native) this.native.pause();
        else this.message('pause');
        this.playing = false;
        this.syncToggle();
      }

      syncToggle() {
        if (!this.toggle) return;
        this.toggle.setAttribute('aria-pressed', String(this.playing));
        this.toggle.setAttribute('aria-label', this.playing ? 'Pause video' : 'Play video');
        const pauseIcon = this.toggle.querySelector('[data-icon-pause]');
        const playIcon = this.toggle.querySelector('[data-icon-play]');
        if (pauseIcon) pauseIcon.classList.toggle('hidden', !this.playing);
        if (playIcon) playIcon.classList.toggle('hidden', this.playing);
      }
    }
  );
}

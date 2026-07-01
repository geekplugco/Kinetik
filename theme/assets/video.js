if (!customElements.get('video-embed')) {
  customElements.define(
    'video-embed',
    class VideoEmbed extends HTMLElement {
      connectedCallback() {
        this.trigger = this.querySelector('[data-play]');
        this.embed = this.getAttribute('data-embed') || '';
        if (this.trigger) this.trigger.addEventListener('click', this.onPlay.bind(this));
      }
      onPlay() {
        if (!this.embed) return;
        var frame = document.createElement('iframe');
        frame.setAttribute('src', this.embed);
        frame.setAttribute('title', this.getAttribute('data-title') || 'Video');
        frame.setAttribute('allow', 'autoplay; fullscreen');
        frame.setAttribute('allowfullscreen', '');
        frame.className = 'absolute inset-0 h-full w-full';
        this.replaceChildren(frame);
      }
    }
  );
}

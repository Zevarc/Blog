<script>
  let currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com',
      icon: `<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>`
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com',
      icon: `<path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>`
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com',
      icon: `<path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>`
    },
    {
      name: 'Email',
      url: 'mailto:hello@zevarc.com',
      icon: `<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>`
    }
  ];
</script>

<footer class="footer">
  <div class="footer-glow"></div>
  
  <div class="container">
    <div class="footer-content">
      <div class="footer-cta">
        <h2 class="cta-title">让我们一起演进</h2>
        <p class="cta-desc">
          如果你对问题拆解的方法论感兴趣，或者想一起探讨技术，欢迎随时联系。
        </p>
        <a href="mailto:hello@zevarc.com" class="cta-button">
          联系我
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </a>
      </div>

      <div class="footer-social">
        {#each socialLinks as link}
          <a 
            href={link.url}
            class="social-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.name}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              {@html link.icon}
            </svg>
          </a>
        {/each}
      </div>

      <div class="footer-bottom">
        <p class="copyright">
          &copy; {currentYear} Zevarc. Designed & Developed with Svelte 5.
        </p>
        <p class="tagline">
          From Zero, Through Arc, To Evolution.
        </p>
      </div>
    </div>
  </div>
</footer>

<style>
  .footer {
    position: relative;
    padding: 120px 0 60px;
    background: #030712;
    overflow: hidden;
  }

  .footer-glow {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 600px;
    height: 300px;
    background: radial-gradient(ellipse at center, rgba(245, 158, 11, 0.08) 0%, transparent 70%);
    pointer-events: none;
  }

  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 0 24px;
  }

  .footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .footer-cta {
    margin-bottom: 60px;
  }

  .cta-title {
    font-size: clamp(1.75rem, 5vw, 2.5rem);
    font-weight: 700;
    color: #F9FAFB;
    margin: 0 0 16px;
    letter-spacing: -0.02em;
  }

  .cta-desc {
    color: #9CA3AF;
    max-width: 400px;
    margin: 0 auto 32px;
    line-height: 1.6;
  }

  .cta-button {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 14px 32px;
    font-size: 1rem;
    font-weight: 500;
    color: #030712;
    background: linear-gradient(135deg, #F59E0B 0%, #EA580C 100%);
    border: none;
    border-radius: 50px;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba(245, 158, 11, 0.3);
  }

  .cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 30px rgba(245, 158, 11, 0.5);
  }

  .cta-button svg {
    transition: transform 0.3s ease;
  }

  .cta-button:hover svg {
    transform: translateX(4px);
  }

  .footer-social {
    display: flex;
    gap: 24px;
    margin-bottom: 60px;
  }

  .social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    color: #6B7280;
    background: #111827;
    border: 1px solid #1F2937;
    border-radius: 50%;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .social-link:hover {
    color: #F59E0B;
    border-color: #F59E0B;
    background: rgba(245, 158, 11, 0.1);
    transform: translateY(-3px);
  }

  .footer-bottom {
    width: 100%;
    padding-top: 40px;
    border-top: 1px solid #1F2937;
  }

  .copyright {
    font-size: 0.8rem;
    color: #4B5563;
    margin: 0 0 8px;
  }

  .tagline {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.75rem;
    color: #F59E0B;
    margin: 0;
    letter-spacing: 0.1em;
  }

  @media (max-width: 767px) {
    .footer {
      padding: 80px 0 40px;
    }

    .footer-social {
      gap: 16px;
    }

    .social-link {
      width: 40px;
      height: 40px;
    }

    .cta-button {
      padding: 12px 24px;
      font-size: 0.9rem;
    }
  }
</style>

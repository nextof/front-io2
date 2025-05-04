<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-section">
        <h3 class="footer-title">Tailwind Cars</h3>
        <p class="footer-text">Driving the future with elegance and performance</p>
      </div>
      
      <div class="footer-section">
        <h4 class="footer-subtitle">Navigation</h4>
        <ul class="footer-links">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/about">About</router-link></li>
        </ul>
      </div>
      
      <div class="footer-section">
        <h4 class="footer-subtitle">Contact Us</h4>
        <p class="footer-text">
          <i class="fas fa-envelope"></i> info@tailwindcars.com
        </p>
        <p class="footer-text">
          <i class="fas fa-phone"></i> +48 123 456 789
        </p>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p class="copyright">&copy; {{ new Date().getFullYear() }} Tailwind Cars. All rights reserved.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

.footer {
  background-color: #1f2937;
  color: #e5e7eb;
  padding: 2rem 0 1rem 0;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
  padding: 0 2rem;
  text-align: center;
}

.footer-section {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer-title {
  font-family: 'Inter', sans-serif;
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  color: #fff;
  font-weight: 500;
}

.footer-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  margin-bottom: 0.75rem;
  color: #fff;
  font-weight: 500;
}

.footer-text {
  margin-bottom: 0.5rem;
  line-height: 1.5;
  color: #9ca3af;
  font-size: 0.875rem;
  font-family: 'Inter', sans-serif;
  font-weight: 300;
}

.footer-links {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: 0.5rem;
}

.footer-links a {
  color: #9ca3af;
  text-decoration: none;
  transition: all 0.2s ease;
  font-size: 0.875rem;
  font-family: 'Inter', sans-serif;
  font-weight: 300;
}

.footer-links a:hover {
  color: #60a5fa;
}

.footer-text i {
  margin-right: 8px;
  color: #60a5fa;
}

.footer-bottom {
  background-color: rgba(0, 0, 0, 0.2);
  padding: 0.75rem 0;
  text-align: center;
  margin-top: 1.5rem;
}

.copyright {
  margin: 0;
  font-size: 0.75rem;
  color: #9ca3af;
  font-family: 'Inter', sans-serif;
  font-weight: 300;
}

@media (max-width: 768px) {
  .footer-container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    gap: 1rem;
  }
  
  .footer-section {
    margin-bottom: 1rem;
  }
}
</style>
  // Phone number formatting
  const phoneInput = document.getElementById('phone');
        
  phoneInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, ''); // Remove all non-digits
      
      if (value.length > 10) {
          value = value.slice(0, 10); // Limit to 10 digits
      }
      
      // Format as (XXX) XXX-XXXX
      if (value.length >= 6) {
          value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
      } else if (value.length >= 3) {
          value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
      } else if (value.length > 0) {
          value = `(${value}`;
      }
      
      e.target.value = value;
  });
  
  phoneInput.addEventListener('keydown', function(e) {
      // Allow: backspace, delete, tab, escape, enter
      if ([8, 9, 27, 13, 46].indexOf(e.keyCode) !== -1 ||
          // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
          (e.keyCode === 65 && e.ctrlKey === true) ||
          (e.keyCode === 67 && e.ctrlKey === true) ||
          (e.keyCode === 86 && e.ctrlKey === true) ||
          (e.keyCode === 88 && e.ctrlKey === true) ||
          // Allow: home, end, left, right, down, up
          (e.keyCode >= 35 && e.keyCode <= 40)) {
          return;
      }
      // Ensure that it is a number and stop the keypress
      if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
          e.preventDefault();
      }
  });
  
  // Contact form configuration
  const CONTACT_EMAIL = 'contact@yourbusiness.com'; // Change this to your actual email
  
  document.getElementById('contactForm').addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const submitBtn = document.getElementById('submitBtn');
      const btnText = document.getElementById('btnText');
      const messageContainer = document.getElementById('messageContainer');
      
      // Get form data
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      
      // Show loading state
      submitBtn.disabled = true;
      submitBtn.classList.add('loading');
      btnText.textContent = 'Sending...';
      
      // Clear previous messages
      messageContainer.innerHTML = '';
      
      // Validate phone number if provided
      if (data.phone && data.phone.trim() !== '') {
          const phoneDigits = data.phone.replace(/\D/g, '');
          if (phoneDigits.length !== 10) {
              showMessage('Please enter a valid 10-digit phone number.', 'error');
              return;
          }
      }
      
      try {
          // Create email content
          const emailSubject = `Contact Form: ${data.subject}`;
          const emailBody = `
Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Subject: ${data.subject}

Message:
${data.message}
          `.trim();
          
          // Create mailto link (this will open the user's email client)
          const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
          
          // For demonstration, we'll simulate sending and show success
          // In a real application, you would send this to your server
          await simulateEmailSend(data);
          
          // Show success message
          showMessage('Thank you for your message! We\'ll get back to you soon.', 'success');
          
          // Reset form
          this.reset();
          
          // Optional: Open email client
          // window.location.href = mailtoLink;
          
      } catch (error) {
          console.error('Error sending message:', error);
          showMessage('Sorry, there was an error sending your message. Please try again.', 'error');
      } finally {
          // Reset button state
          submitBtn.disabled = false;
          submitBtn.classList.remove('loading');
          btnText.textContent = 'Send Message';
      }
  });
  
  // Simulate email sending (replace with actual email service integration)
  function simulateEmailSend(data) {
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              // Simulate success/failure
              if (Math.random() > 0.1) { // 90% success rate for demo
                  resolve();
              } else {
                  reject(new Error('Simulated error'));
              }
          }, 2000);
      });
  }
  
  function showMessage(text, type) {
      const messageContainer = document.getElementById('messageContainer');
      const messageDiv = document.createElement('div');
      messageDiv.className = `${type}-message`;
      messageDiv.textContent = text;
      
      messageContainer.appendChild(messageDiv);
      
      // Trigger animation
      setTimeout(() => {
          messageDiv.classList.add('show');
      }, 100);
      
      // Remove message after 5 seconds
      setTimeout(() => {
          messageDiv.classList.remove('show');
          setTimeout(() => {
              if (messageDiv.parentNode) {
                  messageDiv.parentNode.removeChild(messageDiv);
              }
          }, 300);
      }, 5000);
  }
  
  // Add floating animation to form inputs
  document.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('focus', function() {
          this.style.transform = 'translateY(-2px)';
      });
      
      input.addEventListener('blur', function() {
          this.style.transform = 'translateY(0)';
      });
  });

  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active navigation highlighting
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

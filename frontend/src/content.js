document.addEventListener('mouseup', () => {
    const selectedText = window.getSelection().toString().trim();
    
    if (selectedText.length > 0) {
      const shouldSave = confirm("Save this text to your notes?\n\n" + selectedText);
      if (shouldSave) {
        chrome.runtime.sendMessage({
          type: "SAVE_NOTE",
          text: selectedText,
          url: window.location.href
        });
  
        // Show toast notification
        const toast = document.createElement('div');
        toast.textContent = 'Note saved!';
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.right = '20px';
        toast.style.backgroundColor = '#333';
        toast.style.color = 'white';
        toast.style.padding = '10px';
        toast.style.borderRadius = '5px';
        toast.style.zIndex = '9999';
        
        document.body.appendChild(toast);
  
        // Remove toast after 3 seconds
        setTimeout(() => {
          toast.remove();
        }, 3000);
      }
    }
  });
  
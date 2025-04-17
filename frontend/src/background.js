chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "SAVE_NOTE") {
      chrome.storage.local.get(["notes"], (result) => {
        const notes = result.notes || [];
  
        const newNote = {
          id: Date.now(),
          title: message.text,
          note: "",
          url: message.url
        };
  
        notes.push(newNote);
  
        chrome.storage.local.set({ notes }, () => {
          console.log("Note saved:", newNote);
        });
      });
    }
  });
  
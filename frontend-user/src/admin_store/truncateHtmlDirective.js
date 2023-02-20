const truncateHtmlDirective = {
    beforeMount: (el, binding) => {
        let data = binding.value;
        let maxCharacters = 300;
      
        if (data.length > maxCharacters) {
          data = data.slice(0, maxCharacters) + '...';
        }
      
        el.innerHTML = data;
    }
}

export default truncateHtmlDirective;
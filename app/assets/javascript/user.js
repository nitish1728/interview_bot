let oldArray = JSON.parse(localStorage.getItem('Database')) || []
Save.addEventListener("click",function(){
    var newDetails={
        question:display.textContent,
        answer:convert_text.value
    };
    alert("Saved successfully");
    console.log(display.textContent);
    console.log(convert_text.value);
    oldArray.push(newDetails);
    localStorage.setItem('Database', JSON.stringify(oldArray));
});
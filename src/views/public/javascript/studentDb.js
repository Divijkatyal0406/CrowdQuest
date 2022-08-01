document.querySelector(".sub1").addEventListener("click", function(){
    this.classList.add("active");
    document.querySelector(".sub2").classList.remove("active");
    document.querySelector(".sub3").classList.remove("active");
    document.querySelector(".sub4").classList.remove("active");
    document.querySelector(".dashboard-btn").classList.remove("active");
});

document.querySelector(".sub2").addEventListener("click", function(){
    this.classList.add("active");
    document.querySelector(".sub1").classList.remove("active");
    document.querySelector(".sub3").classList.remove("active");
    document.querySelector(".sub4").classList.remove("active");
    document.querySelector(".dashboard-btn").classList.remove("active");
});

document.querySelector(".sub3").addEventListener("click", function(){
    this.classList.add("active");
    document.querySelector(".sub2").classList.remove("active");
    document.querySelector(".sub1").classList.remove("active");
    document.querySelector(".sub4").classList.remove("active");
    document.querySelector(".dashboard-btn").classList.remove("active");
});

document.querySelector(".sub4").addEventListener("click", function(){
    this.classList.add("active");
    document.querySelector(".sub2").classList.remove("active");
    document.querySelector(".sub3").classList.remove("active");
    document.querySelector(".sub1").classList.remove("active");
    document.querySelector(".dashboard-btn").classList.remove("active");
});
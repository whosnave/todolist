// Memanggil input data task yang sudah masuk ke dalam localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
function showTask (paramData) {
  let dataLists = ""
  paramData.forEach((item) => {
    console.log(item);
    dataLists += `<li>
    <div class="content">
      <div class="list1">
        <div class="text1">
          <h3>${item.title}</h3>
          <p>${item.date}, ${item.time}</p>
        </div>
        <div class="checkbox-container">
          <input type="checkbox" style="width: 30px; height: 30px"/>
          <div class="toolscheckbox1">
            <input class="edit1" type="button" value="Edit" />
            <input id="delBtn" class="delete1" type="button" value="Delete" />
          </div>
        </div>
      </div>
    </div>
  </li>`
  }) 
 const ulList = document.querySelector(".ulList");
 ulList.innerHTML += dataLists;

}

function addBtn() {
  const btn = document.getElementById("addBtn");
  btn.addEventListener("click", () => {
    // Input Fields menggunakan .trim() agar tidak error saat save ke localStorage
    const title = document.getElementById("inputAdd").value.trim();
    const date = document.getElementById("inputDate").value.trim();
    const time = document.getElementById("inputTime").value.trim();

    // Kondisi dimana user tidak memasukan input apapun, maka akan muncul alert
    if (title === "" || date === "" || time === "") {
      alert("Masukkan input dengan benar!");
      return;
    }

    //  // Memanggil Ul sebagai format untuk memasukan Li yang dibuat kedalam innerHTML
     const ulList = document.querySelector(".ulList");
    
     const newContent = `<li>
         <div class="content">
           <div class="list1">
             <div class="text1">
               <h3>${title}</h3>
               <p>${date}, ${time}</p>
             </div>
             <div class="checkbox-container">
               <input type="checkbox" style="width: 30px; height: 30px"/>
               <div class="toolscheckbox1">
                 <input class="edit1" type="button" value="Edit" />
                 <input id="delBtn" class="delete1" type="button" value="Delete" />
               </div>
             </div>
           </div>
         </div>
       </li>`;
    
     //ulList yang dipanggil kemudian ditambah (+=) dengan newContent yang merupakan task dengan format Li
     ulList.innerHTML += newContent;
    
    // Mengkosongkan Input Fields ketika sudah melakukan fungsi addBtn()
    document.getElementById("inputAdd").value = "";
    document.getElementById("inputDate").value = "";
    document.getElementById("inputTime").value = "";
    
    // Simpan data ke localStorage setelah menambahkan item baru
    saveToLocalStorage(title, date, time);
  });
}

addBtn();

// Fungsi addBtn dengan menggunakan enter pada keyboard
function onKey(event) {
  if (event.key === "Enter") {
    document.getElementById("addBtn").click();
  }
} // Mendeklarasikan variabel untuk memanggil HTML input, lalu membuat agar kita bisa enter di semua input fields
const inputElements = document.querySelectorAll(
  "#inputAdd, #inputDate, #inputTime"
);
inputElements.forEach((input) => input.addEventListener("keydown", onKey));

function saveToLocalStorage(title, date, time) {
  // getItem digunakan untuk mengambil data yang sudah terkonversi menjadi string di dalam localStorage (JSON.parse digunakan untuk mengambil data dari localStorage yang berbentuk string, lalu diubah menjadi objek javaScript untuk diprosees, lalu diproses untuk mengeluarkan output yang diinginkan)

  // Menambahkan task baru ke array di dalam localStorage
  tasks.push({ title, date, time });

  // setItem digunakan untuk menyimpan data ke dalam localStorage (JSON.stringfy digunakan untuk menginput data apapun menjadi string yang lalu dimasukan ke localStorage menggunakan setItem)
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

showTask(tasks);

let deleteBtn = document.getElementById("delBtn");
btn.addEventListener("click", () => {
  localStorage.removeItem("tasks")
  showTask();
})

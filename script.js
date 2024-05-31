// Mengambil data tugas dari localStorage, atau membuat array kosong jika belum ada
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Fungsi untuk menampilkan tugas pada halaman
function showTask() {
  // Mengambil data terbaru dari localStorage
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
  // Variabel untuk menyimpan HTML dari daftar tugas
  let dataListHTML = "";

  // Mengisi variabel dataListHTML dengan HTML untuk setiap tugas
  tasks.forEach((task, index) => {
    console.log(index);
    dataListHTML += `
      <li data-index="${index}">
        <div class="content">
          <div class="list1">
            <div class="text1">
              <h3>${task.title}</h3>
              <p>${task.date}, ${task.time}</p>
            </div>
            <div class="checkbox-container">
              <input type="checkbox" style="width: 30px; height: 30px"/>
              <div class="toolscheckbox1">
                <button class="edit1">Edit</button>
                <button class="delete1">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </li>`;
  });

  // Menampilkan daftar tugas ke dalam elemen ul
  const ulList = document.querySelector(".ulList");
  ulList.innerHTML = dataListHTML;

  // Menambahkan event listener untuk setiap tombol delete
  document.querySelectorAll(".delete1").forEach((button) => {
    button.addEventListener("click", (event) => {
      // Mendapatkan indeks tugas yang akan dihapus
      const index = event.target.closest("li").getAttribute("data-index");
      deleteTask(index);
    });
  });

  // Menambahkan event listener untuk setiap tombol edit
  document.querySelectorAll(".edit1").forEach((button) => {
    button.addEventListener("click", (event) => {
      // Mendapatkan indeks tugas yang akan diedit
      const index = event.target.closest("li").getAttribute("data-index");
      editTask(index);
    });
  });
}

// Fungsi untuk menghapus task
function deleteTask(index) {
  tasks.splice(index, 1); // Menghapus task dari array
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Memperbarui localStorage
  showTask(); // Memperbarui tampilan
}

// Fungsi untuk menambahkan task
function addBtn() {
  const btn = document.getElementById("addBtn");
  btn.addEventListener("click", () => {
    // Input Fields menggunakan .trim() agar tidak error saat save ke localStorage
    const title = document.getElementById("inputAdd").value.trim();
    const date = document.getElementById("inputDate").value.trim();
    const time = document.getElementById("inputTime").value.trim();

    // Kondisi dimana user tidak memasukan salah satu dari 3 input, maka akan muncul alert
    if (title === "" || date === "" || time === "") {
      alert("Masukkan input dengan benar!");
      return;
    }

    // Menambahkan task baru ke array di dalam localStorage
    tasks.push({ title, date, time });
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Mengkosongkan Input Fields ketika sudah melakukan fungsi addBtn()
    document.getElementById("inputAdd").value = "";
    document.getElementById("inputDate").value = "";
    document.getElementById("inputTime").value = "";
    
    // Menampilkan ulang daftar tugas
    showTask();
  });
}

// Fungsi untuk mengedit task menggunakan prompt
function editTask(index) {
  // Mendapatkan task yang akan diedit
  const task = tasks[index];

  // Menggunakan prompt untuk mendapatkan nilai baru
  const newTitle = prompt("Edit title:", task.title);
  const newDate = prompt("Edit date:", task.date);
  const newTime = prompt("Edit time:", task.time);

  // Jika pengguna membatalkan prompt, nilai tidak akan diubah
  if (newTitle !== null && newDate !== null && newTime !== null) {
    // Memperbarui task dengan nilai baru
    tasks[index] = { title: newTitle, date: newDate, time: newTime };
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Menampilkan ulang daftar tugas
    showTask();
  }
}

addBtn();

// Fungsi addBtn dengan menggunakan enter pada keyboard
function onKey(event) {
  if (event.key === "Enter") {
    document.getElementById("addBtn").click();
  }
}

// Mendeklarasikan variabel untuk memanggil HTML input, lalu membuat agar kita bisa enter di semua input fields
const inputElements = document.querySelectorAll("#inputAdd, #inputDate, #inputTime");
inputElements.forEach((input) => input.addEventListener("keydown", onKey));

// Menampilkan daftar tugas saat halaman pertama kali dimuat
showTask();

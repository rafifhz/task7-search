// أول شي بدي عرف مصفوفة اجباري لحتى خزن فيها البيانات يلي عم ضيفها على الجدول - كل ما ببعت سطر جديد للجدول بضيفه ككائن على المصفوفة
const data = JSON.parse(localStorage.getItem("todo")) || [];

const loadDataToTable = (name, last, handle, elementIndex) => {
  // عم اعملي سيليكت على الجدول
  const tableBody = document.querySelector(".table tbody");
  //  عم حط بقلب هذا الجدول السطر الجديد بكل عناصره
  tableBody.insertAdjacentHTML(
    "beforeend",
    `
          <tr>
              <th scope="row">${elementIndex}</th>
              <td>${name}</td>
              <td>${last}</td>
              <td>${handle}</td>
              <td>      
              <button data-index=${elementIndex} onclick="deleteRow(event)" class="btn btn-danger delete-button-${elementIndex}">Delete row</button>
              <button data-index=${elementIndex} onclick="updateRow(event)" class="btn btn-warning delete-button-${elementIndex}">Update</button>
              </td>
          </tr>
  `
  );
};

data.forEach((item, index) => {
  loadDataToTable(item.name, item.last, item.handle, index);
});

const tableBody = document.querySelector(".table tbody");

//////////////////////////////////////////////// الاضافة ////////////////////////////////////////////////
// Add a new row هي الدالة الخاصة باضافة سطر جديد للجدول وهي بتتنفذ لما نكبس على زر
const addRowToTable = (name, last, handle, elementIndex) => {
  // عم اعملي سيليكت على الجدول

  //  عم حط بقلب هذا الجدول السطر الجديد بكل عناصره
  tableBody.insertAdjacentHTML(
    "beforeend",
    `
          <tr>
              <th scope="row">${elementIndex}</th>
              <td>${name}</td>
              <td>${last}</td>
              <td>${handle}</td>
              <td>      
              <button data-index=${elementIndex} onclick="deleteRow(event)" class="btn btn-danger delete-button-${elementIndex}">Delete row</button>
              <button data-index=${elementIndex} onclick="updateRow(event)" class="btn btn-warning delete-button-${elementIndex}">Update</button>
              </td>
          </tr>
  `
  );

  //  وهذا الشي يساعدني جيب البيانات بسرعة بدون ما روح دور عليها بالجدولHTML هون ضفت السطر ككائن على المصفوفة بعد ما شفته على الجدول ب
  data.push({
    name: name,
    last: last,
    handle: handle,
  });

  localStorage.setItem("todo", JSON.stringify(data));
};

//  تبعه صفرIndex هون عرفت اول عنصر على اساس هو العنصر يلي
let elementIndex = tableBody.children.length;

//  هون بدي جيب الزر تبع الاضافة
const newRowButton = document.querySelector(".add-new-button");

// ضفتله مراقب للاحداث مشان لما اضغط عليه نفذ اوامر معينة
newRowButton.addEventListener("click", () => {
  // هون جبنا القيم المكتوبة بحقول الادخال
  const nameInput = document.querySelector(".name");
  const lastInput = document.querySelector(".last");
  const handleInput = document.querySelector(".handle");

  // هون ذغلت دالة الاضافة مشان يضيف السطر على الجدول والمصفوفة وعطيته القيم من حقول الادخال
  addRowToTable(
    nameInput.value,
    lastInput.value,
    handleInput.value,
    elementIndex
  );

  // هون زودت المتغير بواحد مشان السطر يلي بدي ضيفه بعده ينزل برقم جديد وزايد عن يلي قبلو واحد
  elementIndex += 1;

  // هون رجع فضيت القيم يلي موجودين بحقول الادخال مشان لما بدي ضيف سطر جديد تكون الحقول فاضية وما اتعذب بمسح القيم وكتابة قيم جديدة
  nameInput.value = "";
  lastInput.value = "";
  handleInput.value = "";
});
//////////////////////////////////////////////// انتهت الاضافة ////////////////////////////////////////////////

//////////////////////////////////////////////// الحذف ////////////////////////////////////////////////
// هون ضفت دالة الحذف
const deleteRow = (event) => {
  //بعدين احذفه TR  هون عم خبره انه بدالة الحذف جي الزر وبعدين انتقل لمستوى الأب بعدين لمستوى الأب مرة ثانية مشان كون وصلت لل
  event.target.parentElement.parentElement.remove();

  const index = event.target.dataset.index;

  delete data[index];

  const newData = data.filter((item) => item);

  localStorage.setItem("todo", JSON.stringify(newData));
};
//////////////////////////////////////////////// انتهى الحذف ////////////////////////////////////////////////

//////////////////////////////////////////////// التعديل ////////////////////////////////////////////////
// اول شي عم جيب زر الحفظ
const saveButton = document.querySelector(".save-after-update");

// للعنصر يلي ضغطتت زر التعديل عليه  Index ثاني شي عم اعمل متغير جديد يفيدني بمعرفة شو
let lastIndex = 0;

const updateRow = (event) => {
  // data-index يلي خزته سابقاً بالزر بال  Index هون جبت الرقم من ال
  const index = event.target.dataset.index;

  // اسندت القيمة للمتغير يلي عرفته فوق
  lastIndex = index;

  // جبت البيانات من العنصر يلي انحفظ بالمصفوفة اول شي عند الاضافة مشان اعرف شو قيم السطر
  const todoItem = data[index];

  // هون كشفنا الستار عن زر الحفظ
  saveButton.classList.remove("d-none");

  // هون عم ارجع اعمل سيليكت لحقول الادخال
  const nameInput = document.querySelector(".name");
  const lastInput = document.querySelector(".last");
  const handleInput = document.querySelector(".handle");

  // هون رجعت حطيت القيم يلي اخذتها من الكائن يلي جبته من المصفوفة بحقول الادخال
  nameInput.value = todoItem.name;
  lastInput.value = todoItem.last;
  handleInput.value = todoItem.handle;
};

// هلأ هون عم ضيف مراقب لزر الحفظ مشان بس ينكبس ينفذ مجموعة اوامر
saveButton.addEventListener("click", () => {
  //  اول شي عم ارجع جيب حقول الادخال
  const nameInput = document.querySelector(".name");
  const lastInput = document.querySelector(".last");
  const handleInput = document.querySelector(".handle");

  // ثاني شي عم جيب الجدول
  const tbody = document.querySelector("tbody");

  // 98 يلي خزنته بالمتغير بالسطر  Index يلي بدي عدله حسب رقم  TR ثالث شي عم جيب ال
  // بعدين عم اعطيه المحتوى الجديد على حسب شو مكتوب بحقول الادخال
  tbody.children[lastIndex].innerHTML = `
        <th scope="row">${lastIndex}</th>
        <td>${nameInput.value}</td>
        <td>${lastInput.value}</td>
        <td>${handleInput.value}</td>
        <td>      
            <button onclick="deleteRow(event)" class="btn btn-danger delete-button-${lastIndex}">Delete row</button>
            <button data-index=${lastIndex} onclick="updateRow(event)" class="btn btn-warning delete-button-${lastIndex}">Update</button>
        </td>
  `;

  //  بعدين عم ارجع حدث العنصر نفسه بالمصفوفة
  // وبالمصفوفة HTML  دوما بدي حدث بمكانين بالجدول بال
  data[lastIndex] = {
    name: nameInput.value,
    last: lastInput.value,
    handle: handleInput.value,
  };

  // هون عم ارجع اخفي زر الحفظ
  saveButton.classList.add("d-none");

  // واخر شي عم نرجع نفضي البيانات من حقول الادخال
  nameInput.value = "";
  lastInput.value = "";
  handleInput.value = "";

  localStorage.setItem('todo', JSON.stringify(data))
});
//////////////////////////////////////////////// انتهى التعديل ////////////////////////////////////////////////

//search

function search() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}
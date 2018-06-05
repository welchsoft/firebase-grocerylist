let orders = $("#orders")
let mylists = $("#my-lists")

let TitleTextBox = $("#TitleTextBox")
let btnSave = $("#btnSave")
let tasksList = $("#tasksList")

 var database = firebase.database()

function updateUI(tasks) {

  tasksList.html('')

  tasks.forEach(function(task){
    let liItem = $("<li>").html(`${task.title}`)
    let removeBtn = $("<button>").html("remove")
    removeBtn.click(function(){
      removeItem(task.id)
    })
    liItem.append(removeBtn)
    tasksList.append(liItem)
  })


}

function setupObservers() {

  // value, child_added, child_removed (check it)
  database.ref("grocery").on("value",function(snapshot){

    let tasks = []

    for(let key in snapshot.val()) {
      // plug in the key and get the object out of the dictionary
      let task = snapshot.val()[key]
      task.id = key
      // console.log(task)
      tasks.push(task)
    }

    updateUI(tasks)
  })

}

btnSave.click(function(){
  saveItem()
})

function saveItem() {

  let title = TitleTextBox.val()

  let ItemsRef = database.ref("grocery")
  ItemsRef.push({
     title : title
   })
   TitleTextBox.val('')
}

function removeItem(id) {
  database.ref("grocery").child(id).remove()
}


setupObservers()

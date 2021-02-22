//@ts-nocheck
"use strict"
window.addEventListener("DOMContentLoaded", execute)

function execute() {
  document
    .querySelector("#get-btn")
    .addEventListener("click", () => renderData("https://reqres.in/api/users"))
  document.querySelector("#post-btn").addEventListener("click", sendData)
}
// axiox call here
async function getData(url) {
  return await axios
    .get(url)
    .then(res => res.data.data)
    .catch(err => console.error(err))
}
// axios call here
async function sendData() {
  axios
    .post(
      "https://reqres.in/api/users",
      {
        email: "imlost@gmail.com",
        password: "nothing_special_here"
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .then(response => console.log(response))
    .catch(err => console.error(err))
}

async function processData(url) {
  return await getData(url)
    .then(data => data.map(({ id, email }) => `${id}, ${email}`))
    .catch(err => console.error(err))
}

async function renderData(url) {
  const dataItemContainer = prepDataItemContainer()

  try {
    const df = new DocumentFragment()
    const processedData = await processData(url)
    processedData.forEach(item => {
      const parag = document.createElement("p")
      parag.textContent = item
      df.append(parag)
    })

    dataItemContainer.append(df)
  } catch (err) {
    console.error(err)
  }
}
// helper func to quickly remove a node's children
function removeChildren(node) {
  while (node.lastChild) {
    node.removeChild(node.lastChild)
  }
}

function prepDataItemContainer() {
  const dataItemContainer = document.querySelector("#data-item-container")
  dataItemContainer.classList.add("data-item-container")
  removeChildren(dataItemContainer)
  return dataItemContainer
}

/**
 * @jest-environment jsdom
 */

const fs = require("fs")
const path = require("path")

//Adds addElementToDOM function to be used inside of this test
const { addElementToDOM } = require("../index.js")

//Adds removeElementToDom function to be used inside of this test
const { removeElementFromDOM } = require("../index.js")

//Load the HTML file into jsdom 
const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf-8")

beforeEach(() => {
  //Reset module registry so index.js re-executes cleanly for each test
  jest.resetModules()

  //Load fresh HTML into the DOM before every test
  document.documentElement.innerHTML = html

  //Require index.js and trigger DOMContentLoaded
  require("../index.js")

  //Fire DOMContentLoaded so index.js attaches listeners to the fresh elements 
  document.dispatchEvent(new Event("DOMContentLoaded"))
})

describe("Check button click", () => {
  test("Button is clicked", () => {

    //Creates variable that stores button element 
    const button = document.querySelector("button")

    //Creates variable that stores display id 
    const display = document.getElementById("dynamic-content")

    //Simulates a button click
    button.click()

    //Compares if button click is successful 
    expect(display.textContent).toBe("Button Clicked!")
  })
})

describe("Check user text submission", () => {
  test("Text submitted is displayed", () => {

    //Creates variable that points to user-input element 
    const userInput = document.getElementById("user-input")
    
    //Creates variable that points to submit button 
    const button = document.querySelector('button[type="submit"]')

    //Creates variable that points to dynamic-content element
    const displayInput = document.getElementById("dynamic-content")

    //Sets userInput to "Hello" 
    userInput.value = "Hello"
    
    //Simulates button click
    button.click()

    //Compares userInput value to displayInput content 
    expect(displayInput.textContent).toBe("Hello")
  })
})

describe("Check blank text submission", () => {
  test("Text submitted is empty", () => {

    //Creates variable that points to user-input element 
    const userInput = document.getElementById("user-input")
    
    //Creates variable that points to submit button 
    const button = document.querySelector('button[type="submit"]')

    //Creates variable that points to dynamic-content element
    const errorDisplay = document.getElementById("error-message")

    //Sets userInput to "Hello" 
    userInput.value = ""
    
    //Simulates button click
    button.click()

    //Compares userInput value to displayInput content 
    expect(errorDisplay.textContent).toBe("Input cannot be empty")
  })
})

describe("Check if element is added and removed to the DOM", () => {
  test("Adds content to the specified container", () => {
    
    //Creates <div> element with id "test" to innerHTML
    document.body.innerHTML = '<div id="test"></div>'
  
    //Sends id and text content to function addElementToDOM
    addElementToDOM('test', '<p>Test</p>')
  
    //Sets variable to test id
    const container = document.getElementById('test')
  
    //Compares the container variable that points to <div>'s text content to expected result  
    expect(container.innerHTML).toBe('<p>Test</p>')
  })

  test('Removes element from the DOM', () => {

    //Sends created id to removeElementFromDom function
    removeElementFromDOM('test')

    //Compares the removed id to be null 
    expect(document.getElementById('test')).toBeNull()
  })

})

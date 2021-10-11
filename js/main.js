/**
 * CREATE
 * READ
 * UPDATE
 * DELETE
 */

/**
 * CODIGO IMPERATIVO
 * let currentData;
    if ( this.read() == '' ){
        currentData = []
    }else{
        currentData =  this.read()
    }
 * CODIGO DECLARATIVO 
 * let currentData = this.read() || []
 */


    class ShoppingList {
        jsonProduct = {
            name: '',
            quantity: '',
            price: '',
            boughtAt: ''
        }
    
        constructor(formName, formFields) {
            this.formName = formName;
            this.jsonFields = formFields
        }
    
    
        
    
        add = () => {
            let newProduct = this.getProductDetails()
            let currentData = this.read()
            let finalData = [...currentData, newProduct]
            localStorage.setItem(DB_NAME, JSON.stringify(finalData))
            
            this.refreshData()
            this.resetForm()
        }
    
        // con JSON.parse convierte lo del localStorage de string a object
        read = () => JSON.parse(localStorage.getItem(DB_NAME))
    
        edit = (td) => {
            
            selectedRow = td.parentElement.parentElement.parentElement;
            document[this.formName][this.jsonFields.name].value = selectedRow.cells[1].innerHTML;
            document[this.formName][this.jsonFields.quantity].value = selectedRow.cells[2].innerHTML;
            document[this.formName][this.jsonFields.price].value = selectedRow.cells[3].innerHTML;
            document[this.formName][this.jsonFields.boughtAt].value = selectedRow.cells[4].innerHTML;
            
        }
    
        update = () => {
    
            let productIndex = parseInt(selectedRow.cells[0].innerHTML)-1
            let listaProductos = this.read()
            let editedProduct = this.getProductDetails()
            listaProductos[productIndex] = editedProduct
            localStorage.setItem(DB_NAME, JSON.stringify(listaProductos))
            
            this.refreshData()
            this.resetForm()
        
        }
    
        delete = (td) => {
            selectedRow = td.parentElement.parentElement.parentElement;
            let productIndex = parseInt(selectedRow.cells[0].innerHTML)-1
            let listaProductos = this.read();
            listaProductos.splice(productIndex, 1)
            localStorage.setItem(DB_NAME, JSON.stringify(listaProductos))
            this.refreshData()
            
        }
    
        getProductDetails = () => {
            return {
                name: document[this.formName][this.jsonFields.name].value,
                quantity: document[this.formName][this.jsonFields.quantity].value,
                price: document[this.formName][this.jsonFields.price].value,
                boughtAt: document[this.formName][this.jsonFields.boughtAt].value
            }
        }
    
        refreshData = () => {
            let listaProductos = this.read();
            listaProductos = listaProductos.map((obj, i) => `
                <tr>
                    <td>${i+1}</td>
                    <td>${obj.name}</td>
                    <td>${obj.quantity}</td>
                    <td>${obj.price}</td>
                    <td>${obj.boughtAt}</td>
                    <td class="colActions">
                    
                    <button type="button" id="btnEdit${i}" name="btn-edit" class="btn btn-primary btn-sm"><i class="fa fa-edit text-ligth" aria-hidden="true" onClick="objetoShoppingList.edit(this)"></i></button>
                    <button type="button" id="btnDelete${i}" name="btn-delete" class="btn btn-danger btn-sm"><i class="fa fa-trash text-ligth" aria-hidden="true" onClick="objetoShoppingList.delete(this)"></i></button>
                    </td>
                </tr>`)
    
            document.getElementById('tableBody').innerHTML = listaProductos.join(' ')
        }
    
        resetForm = () => {
            document[this.formName][this.jsonFields.name].value = "";
            document[this.formName][this.jsonFields.quantity].value = "";
            document[this.formName][this.jsonFields.price].value = "";
            document[this.formName][this.jsonFields.boughtAt].value = "";
            selectedRow = null;
        }
    
    }
    
    
    var selectedRow = null
    const DB_NAME = "shoppingList"
    const formName = 'formProduct'
    const formFields = {
        name: "productName",
        quantity: "productQuantity",
        price: "productPrice",
        boughtAt: "boughtAt"
    }
    
    const objetoShoppingList = new ShoppingList(formName, formFields);
    objetoShoppingList.refreshData()
   

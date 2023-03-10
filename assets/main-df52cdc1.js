(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const estilo = "";
const header = {
  template: `
    
    
    
    <p class="">Pau Diaz</p>
    <h1 class="text-center mt-4">Birras y Tapas </h1>
    `
};
const formPedido = {
  template: `
    
    <div class="d mt-5">
        <div class="card-container">
            <h4><b>San Miguel Especial</b></h4>
            <p>Cerveza rubia, suave y refrescante con un sabor ligeramente amargo.</p>
            <img src="https://www.sanmiguel.com/es/wp-content/uploads/sites/2/2021/01/san-miguel-gluten-free-4.png" alt="Cerveza" style="width:15%">
        </div>
    </div>
  
    <form id="formulario-registro" class="p-5 border border2 shadow mt-2" >
        <h1>Selecciona tu cerveza y haz el pedido</h1>
        <div class="mb-3 col-3">
            <label for="nombre" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="nombre" required>
        </div>
        <div class="mb-3 col-3">
            <label for="nombre" class="form-label">Mesa</label>
            <input type="text" class="form-control" id="mesa" required>
        </div>
        <div class="mb-3 col-3">
            <label for="nombre" class="form-label">Elige tu birra</label>
            <input type="text" class="form-control" id="birra" required>
        </div>
        <div class="mb-3 col-3">
            <label for="nombre" class="form-label">¿Cuantas traigo?</label>
            <input type="text" class="form-control" id="ctraigo" required>
        </div>
        
        <button type="submit" class="btn btn-primary">Añadir Pedido</button>

      
 
    </form>
 
  
    


`
};
const tablaCervezas = {
  template: `
    <div>
    <table class="table table-dark mb-3 container mt-5 border border2 shadow">
      <thead>
        <tr>
          <th scope="col">Cerveza</th>
          <th scope="col">Cantidad</th>
          <th scope="col">Borrar</th>
          <th scope="col">Editar</th>
        </tr>
      </thead>
      <tbody id="Tabla">
        <tr>
          <td>San Miguel Especial</td>
          <td>2</td>
          <td><button type="button" class="btn btn-danger eliminar">Eliminar</button></td>
          <td><button type="button" class="btn btn-success editar">Editar</button></td>
        </tr>
      </tbody>
    </table>
    `
};
document.querySelector("header").innerHTML = header.template;
document.querySelector("main").innerHTML = formPedido.template;
document.querySelector("footer").innerHTML = tablaCervezas.template;

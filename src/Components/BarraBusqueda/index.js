import React from 'react'

function BarraBusqueda({setQuery, query, search}) {
    return (
        <input 
        type="text"
        className="barra-busqueda"
        placeholder="Buscar..."
        name=""
        id=""
        onChange={e => setQuery(e.target.value)}
        value={query}
        onKeyPress={search}
      />
    )
}

export default BarraBusqueda

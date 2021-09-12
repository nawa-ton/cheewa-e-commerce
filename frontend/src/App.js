import data from './data/initial'

function App() {
  return (
      <div className="grid-container">
        <header className="row">
          <div>
            <a href="/">Cheewa</a>
          </div>
          <div>
            <a href="/cart">Cart</a>
            <a href="/signin">Sign in</a>
          </div>
        </header>

        <main>
          <div className="row center">
            {
              data.products.map(product => (
                  <div key={product._id} className="card">
                    <a href={`/product/${product._id}`}>
                      <img alt={product.name} className="medium" src={product.image}/>
                    </a>
                    <div className="card-body">
                        <a href={`/product/${product._id}`}>
                        <h2>{product.name}</h2>
                      </a>
                      <div className="rating">
                        <span><i className="fa fa-star"/></span>
                        <span><i className="fa fa-star"/></span>
                        <span><i className="fa fa-star"/></span>
                        <span><i className="fa fa-star"/></span>
                        <span><i className="fa fa-star"/></span>
                      </div>
                      <div className="price">${product.price}</div>
                    </div>
                  </div>
              ))
            }
          </div>
        </main>

        <footer className="row center">
          All right reserve
        </footer>
      </div>
  );
}

export default App;

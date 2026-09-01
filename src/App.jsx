import { Route, Switch, Router as WouterRouter } from 'wouter';
import { Home, Portfolio, Services, About, Book, NotFound } from './pages/Pages';

function App() {
  return <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Switch>
    <Route path="/" component={Home} />
    <Route path="/portfolio" component={Portfolio} />
    <Route path="/services" component={Services} />
    <Route path="/about" component={About} />
    <Route path="/book" component={Book} />
    <Route component={NotFound} />
  </Switch></WouterRouter>;
}

export default App;
interface Visitable<VISITOR_TYPE> {
  accept(visitor: VISITOR_TYPE): void;
}

export default Visitable

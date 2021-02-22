const obj = { getArrow() { return () => { console.log(this === obj); }; } }
obj.getArrow()
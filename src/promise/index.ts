const State = {
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
  PENDING: "pending",
};

export default class CustomPromise {
  result: any;
  private currState = State.PENDING;
  thenCallbacks: Array<any> = [];
  catchCallbacks: Array<any> = [];

  constructor(todo: Function) {
    todo(this.resolve.bind(this), this.reject.bind(this));
  }

  then(cbkThen: Function, cbkCatch?: Function) {
    return new CustomPromise((thenResolve, thenReject) => {
      if (cbkThen !== undefined) {
        this.thenCallbacks.push(cbkThen);
      }

      if (cbkCatch !== undefined) {
        this.catchCallbacks.push(cbkCatch);
      }

      this.executeCallbacks();
    });
  }

  catch(cbk: Function) {
    this.then(undefined, cbk);
    return this;
  }

  finally(cbk: Function) {}

  private resolve(val: any) {
    if (this.currState !== State.PENDING) {
      return;
    }
    this.currState = State.FULFILLED;
    this.result = val;
    this.executeCallbacks();
  }

  private reject(val: any) {
    if (this.currState !== State.PENDING) {
      return;
    }
    this.currState = State.REJECTED;
    this.result = val;
    this.executeCallbacks();
  }

  private executeCallbacks() {
    if (this.currState === State.FULFILLED) {
      this.thenCallbacks.forEach((fun: Function) => {
        fun(this.result);
      });

      this.thenCallbacks = [];
    } else {
      this.catchCallbacks.forEach((fun: Function) => {
        fun(this.result);
      });

      this.catchCallbacks = [];
    }
  }
}

function task(resolve: Function, reject: Function) {
  setTimeout(() => {
    resolve("HELLO");
  }, 1000);
}

const temp = new CustomPromise(task)
  .then((result: any) => {
    console.log("Resolved:", result);
  })
  .catch((error: any) => {
    console.error("Error:", error);
  });

// const count = true;
//
// let countValue = new Promise(function (resolve, reject) {
//   if (count) {
//     resolve("There is a count value.");
//   } else {
//     reject("There is no count value");
//   }
// });

// console.log(countValue);

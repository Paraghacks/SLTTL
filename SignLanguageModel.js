import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';

class SignLanguageModel {
  constructor() {
    this.model = null;
  }

  async loadModel() {
    this.model = await handpose.load();
  }

  async predict(video) {
    if (!this.model) return null;

    const predictions = await this.model.estimateHands(video);
    return predictions;
  }
}

export default SignLanguageModel;

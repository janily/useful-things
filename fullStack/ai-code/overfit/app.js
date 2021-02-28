// import { getData } from './data'
import { getData } from './data'

import * as tf from '@tensorflow/tfjs'
import * as tfvis from '@tensorflow/tfjs-vis'

window.onload = async () => {
  // const data = getData(200);
  const data = getData(200, 3);

  tfvis.render.scatterplot(
    { name: '训练数据' },
    {
      values: [
        data.filter(p => p.label === 1),
        data.filter(p => p.label === 0)
      ]
    }
  )

  const model = tf.sequential();
  model.add(tf.layers.dense({
    units: 10,
    inputShape: [2],
    activation: 'tanh',
    kernelRegularizer: tf.regularizers.l2({ l2: 1 })  //权重衰减，解决过拟合
  }));
  //model.add(tf.layers.dropout({rate: 0.9})) //丢弃法，随机丢弃层，缓解过拟合
  model.add(tf.layers.dense({
    units: 1,
    activation: 'sigmoid',
  }));

  model.compile({
    loss: tf.losses.logLoss,
    optimizer: tf.train.adam(0.1)
  })

  const inputs = tf.tensor(data.map(p => [p.x, p.y]));
  const labels = tf.tensor(data.map(p => p.label));

  await model.fit(inputs, labels, {
    validationSplit: 0.2,  //验证数据， 20%
    epochs: 200,
    callbacks: tfvis.show.fitCallbacks(
      { name: '训练效果' },
      ['loss', 'val_loss'],
      { callbacks: ['onEpochEnd'] }   //演示欠拟合
    )
  })

}
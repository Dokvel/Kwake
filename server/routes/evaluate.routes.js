import * as EvaluateController from '../controllers/evaluate.controller';

export default function (router, protectedMiddleware) {

  router.get('/evaluate/:token', EvaluateController.getTokenInfo);

  router.get('/evaluates', EvaluateController.getEvaluates);

  router.post('/evaluate/request', protectedMiddleware, EvaluateController.createEvaluateRequest);

  router.post('/evaluate/:token', EvaluateController.addEvaluate);

  return router;
}

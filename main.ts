import Kuroshiro from "npm:kuroshiro";
import KuromojiAnalyzer from "npm:kuroshiro-analyzer-kuromoji";
import { Application, Router } from "https://deno.land/x/oak@v14.0.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
const kuroshiro = new Kuroshiro.default();
console.log("初始化Kuroshiro模块...")
await kuroshiro.init(new KuromojiAnalyzer());

console.log("初始化Kuroshiro模块完毕")
const router = new Router()
  .post("/", async (ctx, next) => {
    const body = await ctx.request.body.json();
    const { str, mode, to, romajiSystem } = body;
    console.log(body)
    const result = await kuroshiro.convert(str, {
      mode, to, romajiSystem
    });
    console.log(`响应${result}`)
    ctx.response.body = result
    await next()
  })
console.log("构建路由...")

const app = new Application();
app.use(oakCors()); //  Enable CORS for All Routes
app.use(router.routes());
app.use(router.allowedMethods());
console.log("注册路由...")
app.listen({ port: 11451 });
console.log("服务已在本地 http://localhost:11451 开启")



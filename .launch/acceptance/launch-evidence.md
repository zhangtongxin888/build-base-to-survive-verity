# Build Base to Survive VERITY 上线证据

- Run ID：`build-base-to-survive-verity-20260826-1823`
- 正式域名：`build-basetosurviveverity.wiki`
- 验收状态：`待总控验收`
- 最后更新：2026-08-27T10:17:12Z

## 证据表

| 项目 | 结果 | 证据 |
|---|---|---|
| 独立 GitHub 仓库 | 通过 | `https://github.com/zhangtongxin888/build-base-to-survive-verity`；正式分支 `main`。 |
| 正式源码 commit | 通过 | `9509e3733c99c147c0a21a4c354f14698a895a09`（`docs: approve responsive design gate`）；`origin/main` 与该 commit 一致。 |
| GitHub 与托管项目连接 | 通过 | Vercel 项目 `prj_feYnkPcD4i9DGzrXscG0TaBxws0c` 已连接 `zhangtongxin888/build-base-to-survive-verity`；Git 自动部署元数据包含 `githubCommitRef=main`、`githubCommitSha=9509e3733c99c147c0a21a4c354f14698a895a09`、`githubDeployment=1`。 |
| 托管平台选择 | 通过（有回退） | 首选 Cloudflare Pages 未采用：本机没有已认证 Wrangler，且 Cloudflare 官方文档要求 Pages 裸域成为 Cloudflare zone 并把 nameserver 指向 Cloudflare；本次必须保留 Spaceship nameserver，因此改用已认证 Vercel。官方依据：`https://developers.cloudflare.com/pages/configuration/custom-domains/`。 |
| 正式部署 | 通过 | Vercel deployment `dpl_8h2PkTeMoka5L6HcCw5JcmDSkFRY`，target=`production`，status=`Ready`，Git commit=`9509e3733c99c147c0a21a4c354f14698a895a09`；平台地址 `https://build-base-to-survive-verity-a3t4n0d3v.vercel.app` 仅作部署证据，不作为正式上线地址。 |
| 正式域名绑定 | 通过 | `build-basetosurviveverity.wiki` 与 `www.build-basetosurviveverity.wiki` 均已添加到 Vercel 项目；实时严格复核确认 domainOwnership=`current-scope`、attached=`true`、project.verified=`true`，归属项目 `prj_feYnkPcD4i9DGzrXscG0TaBxws0c`。 |
| DNS 写入前快照 | 通过 | 权威 NS：`launch1.spaceship.net`、`launch2.spaceship.net`；SOA serial `1787739511`；裸域旧 A：`34.216.117.25`、`54.149.79.189`；`www` 无记录；MX/TXT/CAA 均无记录。没有 nameserver、邮件或第三方验证记录被替换。 |
| Vercel 当前推荐记录 | 通过 | 2026-08-26T11:37:51Z 的严格校验推荐：`@ A 216.198.79.1`、`@ A 64.29.17.1`、`www CNAME 55b9b961c7d6f408.vercel-dns-017.com.`；rank 1 完整集合已交由总控写入。 |
| DNS 最终公网解析 | 通过 | 2026-08-27 实时复核：权威 `launch1.spaceship.net`、`launch2.spaceship.net` 以及 `1.1.1.1`、`8.8.8.8` 均返回裸域 A `216.198.79.1` + `64.29.17.1`，`www` CNAME `55b9b961c7d6f408.vercel-dns-017.com.`。 |
| Vercel 域名严格校验 | 通过 | Vercel CLI `58.9.1` 对裸域与 `www` 分别执行 `domains verify --strict --json`：均为 `ok=true`、`misconfigured=false`、`conflicts=[]`、`attached=true`、`verified=true`、status=`configured_correctly`，项目归属 `prj_feYnkPcD4i9DGzrXscG0TaBxws0c`。 |
| 裸域 HTTPS | 通过 | `https://build-basetosurviveverity.wiki/` 返回 HTTP/2 200；Vercel certificate `cert_xBpJ8PphFaJAN3Zd9WbXSie0` 覆盖裸域与 `www`、renew=`yes`，证书有效期 2026-08-27 03:19:52Z 至 2026-11-25 03:19:51Z；HTTP 裸域 308 升级到 HTTPS。DNS 已正确但平台未自动下发证书时，仅对这两个已绑定域名执行一次 `vercel certs issue` 后成功。 |
| `www` 跳转 | 通过 | Vercel 项目域名设置已将 `www` 精确设为 redirect=`build-basetosurviveverity.wiki`、redirectStatusCode=`308`。`https://www.build-basetosurviveverity.wiki/beginner-guide/?probe=bbtsv` 返回 308 到 `https://build-basetosurviveverity.wiki/beginner-guide/?probe=bbtsv`，路径与查询参数完整保留，跟随后 200。 |
| 关键页面 | 通过 | 生产 HTTPS 实测 `/`、`/beginner-guide/`、`/mistakes/`、`/faq/`、`/sources/` 均返回 200 `text/html; charset=utf-8`。 |
| robots | 通过 | `https://build-basetosurviveverity.wiki/robots.txt` 返回 200 `text/plain; charset=utf-8`，允许抓取并只声明正式 Sitemap。 |
| Sitemap | 通过 | `https://build-basetosurviveverity.wiki/sitemap.xml` 返回 200 `application/xml`，解析为 5 个裸域 HTTPS canonical URL：首页、`/beginner-guide/`、`/mistakes/`、`/faq/`、`/sources/`；GSC 详情页显示“已成功处理站点地图”，已发现网页 5。 |
| canonical | 通过 | 生产复核确认首页只有一个自引用 canonical；Sitemap 5 个页面全部返回可索引 200 且各自只有一个正确的自引用 canonical，构建路由与 Sitemap 双向一致。 |
| OG / Twitter | 通过 | 生产初始 HTML 含完整 OG/Twitter 元数据；绝对正式 URL `https://build-basetosurviveverity.wiki/og-image.svg` 返回 200 `image/svg+xml`。5 个收录页面均使用该项目原创图片，没有外部字体或第三方图片。 |
| 结构化数据 | 通过 | 生产首页 JSON-LD 可解析；源码与构建复核覆盖首页 WebSite/WebPage/VideoGame、新手页 HowTo、FAQ 页 FAQPage、来源页 CollectionPage，且只使用批准事实。 |
| 自动线上验收 | 通过（有已解释差异） | `verify_launch.py` 共 27 项：24 项通过；3 项仅因脚本合成无尾斜杠探针 `/__codex-launch-check` 与本站统一尾斜杠规范化后路径文本不同而报错。实际要求路径使用尾斜杠复测：HTTP→HTTPS 永久跳转、`www`→裸域 308、路径与查询保留均通过；关键页面、robots、Sitemap、metadata、JSON-LD 与安全响应头均通过。 |
| GSC Domain Property | 通过 | 2026-08-27（北京时间）由总控使用 Chrome computer-use 完成；Domain Property `sc-domain:build-basetosurviveverity.wiki` 已通过 DNS TXT 所有权验证。 |
| GSC 验证 DNS | 通过 | Google 验证 TXT 已由总控追加到 Spaceship 并永久保留，没有替换既有 A/CNAME/NS/MX。最终值不写入证据；本 worker 收尾复核时，两台权威 NS、`1.1.1.1`、`8.8.8.8` 均可查询到 1 条 Google 验证 TXT。 |
| GSC Sitemap | 通过 | 2026-08-27（北京时间）由总控提交 `https://build-basetosurviveverity.wiki/sitemap.xml`；详情页原样显示“已成功处理站点地图”，已发现网页 5。 |
| GSC 首页索引请求 | 通过 | 2026-08-27（北京时间）由总控对 canonical 首页 `https://build-basetosurviveverity.wiki/` 请求编入索引一次，界面确认进入优先抓取队列；仅记录已请求，不宣称已收录。 |
| 375 / 768 / 1440 设计门禁 | 通过 | `.launch/acceptance/design-approved.json`；证据图在 `.launch/acceptance/screenshots/`。三档 documentWidth 分别等于 375/768/1440；页面级无横向溢出。 |
| 首屏主按钮 | 通过 | 三档首屏最大主按钮均为“从新手教程开始”，目标 `/beginner-guide/`；Roblox 外链不是主按钮。 |
| 导航闭环 | 通过 | 实测 `/` → `/beginner-guide/` → `/mistakes/` → `/faq/` → `/sources/` → `/`，浏览器错误与控制台错误均为空。 |
| 事实引用 | 通过 | `.launch/research/research-approved.json` 批准 28 条、拒绝 12 条；页面 `data-fact-ids` 全部属于批准清单；公开 `/sources/` 可回到原始 HTTPS 来源。 |
| 素材许可 | 通过 | 候选 `assets=[]`，未接收第三方素材；CSS、系统字体与 Codex 原创几何 SVG 均为项目自有。 |
| lint / test / build | 通过 | 2026-08-27 使用 Node `v22.23.2` 重跑 `npm run check`：lint 通过；Node 测试 6/6；生产构建完成；构建产物再次验证 5 个 canonical 页面与 28 个可用批准事实 ID。 |

## 供应方、模型与回退

| 阶段 | 实际供应方与模型 | 结果与回退原因 |
|---|---|---|
| Research | Grok / `grok-4.6` | 生成 `.launch/research/grok-research-v1.json`；Grok 的自报核验不作为通过依据。 |
| Fact gate | OpenAI Codex / `gpt-5.6-sol`（xhigh） | Codex 独立核验后批准 28 条、拒绝 12 条，产出 `.launch/research/research-approved.json`。 |
| Candidate design | Kimi / `kimi-code/k3` | 候选格式通过；原始设计包 SHA256 `504795e275df29057d048ef3ff0725de1ff13529f41fa2b2e0c6b6b1ebaf714a`。 |
| Formal code and review | OpenAI Codex / `gpt-5.6-sol`（xhigh） | 候选混入 Rebirth“声望式”、通行证永久效果、装饰物用途等被拒绝或无来源表述，因此保留深色加琥珀色方向并执行一次正式重写；详见 `.launch/acceptance/design-approved.json`。 |
| Hosting | Vercel CLI `58.9.1` | Cloudflare Pages 裸域会要求 nameserver 迁移，与保留 Spaceship DNS 的保护规则冲突；改用 Vercel 外部 DNS。 |

## 回滚与保护

- DNS 传播或 TLS 失败时，只恢复裸域旧 A：`34.216.117.25`、`54.149.79.189`，并删除本次新建的 `www` Vercel CNAME；不动 NS、MX、TXT、CAA 或其他子域。
- 如果 GSC 验证失败，保留业务 A/CNAME，只检查 Google 验证记录的 owner 与值；不覆盖业务记录。
- 当前为“待总控验收”；仍需总控完成最终验收，不得据此自行宣布上线成功。

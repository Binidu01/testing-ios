#!/usr/bin/env node
import {input,select,password}from'@inquirer/prompts';import h from'fs';import x from'fs/promises';import p from'path';import {execSync}from'child_process';import {fileURLToPath}from'url';import {isatty}from'tty';var Y=fileURLToPath(import.meta.url),G=p.dirname(Y),Q=p.join(G,"..","package.json"),Z=JSON.parse(h.readFileSync(Q,"utf-8")),H=Z.version,ee=p.join(G,"..","assets"),a={reset:"\x1B[0m",bold:"\x1B[1m",dim:"\x1B[2m",cyan:"\x1B[36m",green:"\x1B[32m",yellow:"\x1B[33m",red:"\x1B[31m",blue:"\x1B[34m",magenta:"\x1B[35m"},ie=`
${a.cyan}${a.bold}               
            XXXXXXXXXXXXXXXX               
         XXXXXXXXXXXXXXXXXXXXXz            
       YXXXXXXXXXXXXXXXXXXXXXXXX           
      vXXXXXXXXXXn    YXXXXXXXXXX          
      XXXXXXXXX        XXXXXXXXXX          
      XXXXXXXXX       XXXXXXXXXX           
      XXXXXXXXX  XXXXXXXXXXXXXX            
      XXXXXXXXX  XXXXXXXXXXXYz             
      XXXXXXXXX  XXXXXXXXXXXXXXXXY         
      XXXXXXXXX      YXXXXXXXXXXXXX        
      XXXXXXXXX          YXXXXXXXXXX        
      XXXXXXXXX           XXXXXXXXXz       
      XXXXXXXXX  Xn     YXXXXXXXXXX        
      XXXXXXXXX  XXXXXXXXXXXXXXXXXX        
      XXXXXXXXX  XXXXXXXXXXXXXXXX          
      XXXXXXXXX  XXXXXXXXXXXXX                        
${a.reset}
${a.dim}             Developed By Binidu${a.reset}
`,z="v20.19.0",te=/^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])$/i,ne=/^(\.|\.\.|npm|node)|[<>:"|?*\\]|[^a-z0-9\-.]/i,t={info:e=>console.log(`${a.cyan}${a.bold}INFO${a.reset} ${e}`),success:e=>console.log(`${a.green}${a.bold}OK${a.reset} ${e}`),warn:e=>console.log(`${a.yellow}${a.bold}WARN${a.reset} ${e}`),error:e=>console.error(`${a.red}${a.bold}ERROR${a.reset} ${e}`),step:e=>console.log(`${a.blue}${a.bold}STEP${a.reset} ${e}`),plain:e=>console.log(e),skip:e=>console.log(`${a.yellow}${a.bold}SKIP${a.reset} ${e}`),command:e=>console.log(`${a.magenta}${a.bold}RUN${a.reset} ${e}`)};function A(){return isatty(process.stdin.fd)&&isatty(process.stdout.fd)}function w(e=1){process.exit(e);}async function $(e){return select({message:e.message,choices:[{name:"Yes",value:true},{name:"No",value:false}],default:e.default!==false})}function L(e){let i=e.split(/[-_\s]+/).filter(Boolean);return i.length===0?"My App":i.map(n=>n.charAt(0).toUpperCase()+n.slice(1)).join(" ")}process.on("SIGINT",()=>{t.plain(`
`),t.warn("Operation cancelled."),w(0);});process.on("uncaughtException",e=>{t.error(`Uncaught exception: ${e.message}`),w(1);});process.on("unhandledRejection",e=>{t.error(`Unhandled rejection: ${e instanceof Error?e.message:String(e)}`),w(1);});function ae(){let[e=0,i=0]=process.version.slice(1).split(".").map(Number),[n=0,r=0]=z.slice(1).split(".").map(Number);(e<n||e===n&&i<r)&&(t.error(`Node.js ${z}+ required. Current: ${process.version}`),t.info("Update at https://nodejs.org"),w(1));}function re(e=100){try{if(!h.statfsSync)return;let i=h.statfsSync(process.cwd()),n=i.bavail*i.bsize/(1024*1024);n<e&&(t.error(`Insufficient disk space. Need ${e}MB, have ${Math.floor(n)}MB.`),w(1));}catch(i){i.code!=="ENOENT"&&t.warn(`Could not check disk space: ${i.message}`);}}function oe(){let e=process.argv.slice(2);(e.includes("--version")||e.includes("-v"))&&(t.plain(`${a.cyan}Bini.js CLI${a.reset} v${H}`),w(0)),(e.includes("--help")||e.includes("-h"))&&(t.plain(`
${a.bold}${a.cyan}Usage:${a.reset} create-bini-app [project-name] [options]

${a.bold}${a.cyan}Options:${a.reset}
  --version, -v       Show version number
  --help, -h          Show help
  --typescript        Use TypeScript
  --javascript        Use JavaScript
  --tailwind          Use Tailwind CSS
  --css-modules       Use CSS Modules
  --none              No styling
  --force             Overwrite existing directory
  --install           Auto-install dependencies
  --no-install        Skip dependency installation
  --platform <target> Target platform: web, windows, linux, macos, android, ios
  --app-name <name>   Display app name (used as Tauri app name and window title)
  --sign              Auto-confirm code signing setup (still prompts for details)
  --nosign            Skip code signing setup entirely, no prompts
  --npm               Force npm as the package manager
  --pnpm              Force pnpm as the package manager
  --yarn              Force yarn as the package manager
  --bun               Force bun as the package manager

${a.bold}${a.cyan}Examples:${a.reset}
  ${a.dim}create-bini-app my-app${a.reset}
  ${a.dim}create-bini-app my-app --typescript --tailwind${a.reset}
  ${a.dim}create-bini-app my-app --platform windows${a.reset}
  ${a.dim}create-bini-app my-app --platform android --app-name "My App"${a.reset}
  ${a.dim}create-bini-app my-app --platform android --nosign --pnpm${a.reset}
    `),w(0));let i=e.includes("--typescript"),n=e.includes("--javascript")||e.includes("--no-typescript"),r=e.includes("--tailwind"),o=e.includes("--css-modules"),l=e.includes("--none"),c=e.includes("--install"),s=e.includes("--no-install"),f=e.indexOf("--platform"),g=f!==-1?e[f+1]:void 0,b=e.indexOf("--app-name"),d=b!==-1?e[b+1]:void 0,u=e.includes("--sign"),X=e.includes("--nosign"),k={"--npm":"npm","--pnpm":"pnpm","--yarn":"yarn","--bun":"bun"},I=Object.keys(k).filter(C=>e.includes(C));i&&n&&(t.error("Cannot use --typescript and --javascript together."),w(1)),[r,o,l].filter(Boolean).length>1&&(t.error("Cannot use more than one of --tailwind, --css-modules, --none."),w(1)),c&&s&&(t.error("Cannot use --install and --no-install together."),w(1)),u&&X&&(t.error("Cannot use --sign and --nosign together."),w(1)),I.length>1&&(t.error(`Cannot use more than one of ${Object.keys(k).join(", ")} together.`),w(1));let J=I.length===1?k[I[0]]:void 0;return {projectName:e.find(C=>!C.startsWith("--")&&C!==g&&C!==d),flags:{force:e.includes("--force"),typescript:i?true:n?false:void 0,javascript:n,tailwind:r,cssModules:o,noStyle:l,install:c?true:s?false:void 0,platform:g,appName:d,sign:u?true:X?false:void 0,packageManager:J}}}function W(e){return !e||e.length>50||te.test(e)?false:!ne.test(e)}function se(e){return ["web","windows","linux","macos","android","ios"].includes(e)}function q(){let e=process.platform;return e==="win32"?"windows":e==="darwin"?"macos":e==="linux"?"linux":"windows"}function U(e){try{h.mkdirSync(e,{recursive:!0,mode:488});}catch(i){throw new Error(`Cannot create directory: ${e}. ${i.message}`)}}async function v(e,i,n={}){await x.mkdir(p.dirname(e),{recursive:true,mode:488}),await x.writeFile(e,i,{mode:n.mode??416,flag:n.flag??"w"});}function le(e,i={}){let n=i.allowedBase??process.cwd();if(!e)throw new Error("Path required.");let r=p.resolve(e),o=p.resolve(n),l=p.relative(o,r);if(l===""||l.startsWith("..")||p.isAbsolute(l))throw new Error(`Refusing to delete: "${r}" is outside the allowed base "${o}".`);if([p.resolve("/"),process.env.HOME?p.resolve(process.env.HOME):null,process.env.USERPROFILE?p.resolve(process.env.USERPROFILE):null].filter(f=>f!==null).includes(r))throw new Error("Refusing to delete a system directory.");if(r.split(p.sep).filter(Boolean).length<2)throw new Error("Refusing to delete a root-level directory (safety check).");h.existsSync(r)&&h.rmSync(r,{recursive:true,force:true});}function O(e,i={}){try{let n=execSync(e,{shell:process.platform==="win32"?"cmd.exe":"/bin/sh",stdio:i.stdio??"pipe",timeout:i.timeout??12e4,cwd:i.cwd,windowsHide:!0,encoding:"utf8"});return String(n)}catch(n){throw new Error(`Command failed: ${e}
${n.message??String(n)}`)}}function N(e){try{let i=process.platform==="win32"?`where ${e}`:`which ${e}`;return O(i,{stdio:"ignore"}),!0}catch{return  false}}function j(e,i){try{execSync(e,{cwd:i,stdio:"ignore",shell:process.platform==="win32"?"cmd.exe":"/bin/sh",timeout:12e4,windowsHide:!0});}catch{}}function D(e,i){switch(e){case "npm":return `npx ${i}`;case "yarn":return `yarn ${i}`;case "pnpm":return `pnpm ${i}`;case "bun":return `bunx ${i}`}}function m(e,i){return e==="npm"?`npm run ${i}`:`${e} ${i}`}var E={bun:"bun --version",pnpm:"pnpm --version",yarn:"yarn --version",npm:"npm --version"};function de(){let i=[{name:"bun",command:E.bun,priority:4},{name:"pnpm",command:E.pnpm,priority:3},{name:"yarn",command:E.yarn,priority:2},{name:"npm",command:E.npm,priority:1}].filter(n=>{try{return O(n.command,{stdio:"ignore"}),!0}catch{return  false}});if(i.length===0)throw new Error("No package manager found. Install npm, yarn, pnpm, or bun.");return i.sort((n,r)=>r.priority-n.priority)[0].name}function ce(e){if(e)try{return O(E[e],{stdio:"ignore"}),{pm:e,failed:!1,forced:!0}}catch{t.error(`Requested package manager "${e}" was not found on PATH.`),w(1);}try{return {pm:de(),failed:!1,forced:!1}}catch(i){return t.warn(`Could not detect package manager: ${i.message}`),{pm:"npm",failed:true,forced:false}}}async function pe(e,i,n){if(!n)return  false;let r={npm:"npm install --no-audit --no-fund --loglevel=error",yarn:"yarn install --silent --no-progress",pnpm:"pnpm install --reporter=silent",bun:"bun install --silent"};t.step(`Installing dependencies with ${i}...`);try{return O(r[i],{cwd:e,stdio:"inherit",timeout:3e5}),t.success("Dependencies installed."),!0}catch{return t.warn("Auto-install failed. Run manually:"),t.plain(`    ${a.green}cd ${p.basename(e)}${a.reset}`),t.plain(`    ${a.green}${i} install${a.reset}`),false}}function ue(e,i){return e.typescript===true?true:e.javascript===true?false:i.typescript}function me(e){let i=e?"ts":"js";return {main:e?"tsx":"jsx",config:i,api:i}}async function ge(e,i){let n;e.typescript!==void 0?n=e.typescript:A()?n=await $({message:"Use TypeScript?",default:true}):n=true;let r;e.tailwind?r="Tailwind":e.cssModules?r="CSS Modules":e.noStyle?r="None":A()?r=await select({message:"Styling solution?",choices:[{name:"Tailwind CSS",value:"Tailwind"},{name:"CSS Modules",value:"CSS Modules"},{name:"None",value:"None"}],default:"Tailwind"}):r="Tailwind";let o,l=q();if(e.platform&&se(e.platform))o=e.platform;else if(A()){let s=[{name:"Web Application",value:"web"},{name:"Windows Desktop",value:"windows"},{name:"Linux Desktop",value:"linux"},{name:"macOS Desktop",value:"macos"},{name:"Android",value:"android"},{name:"iOS",value:"ios"}];console.log(`
Detected OS: ${l}`),o=await select({message:"Select target platform:",choices:s,default:"web"});}else o="web";let c=i;return o!=="web"&&(e.appName?c=e.appName:A()?c=await input({message:"App name? (used as the app name and window title)",default:L(i),validate:s=>s.trim().length>0?true:"Required."}):c=L(i)),{typescript:n,styling:r,platform:o,appName:c}}async function fe(e){let i=["favicon.ico","apple-touch-icon.png","og-image.png","logo.png"];await Promise.all(i.map(async n=>{let r=p.join(ee,n),o=p.join(e,n);try{await x.access(r),await x.copyFile(r,o);}catch{t.warn(`Asset not found, skipping: ${n}`);}}));}async function be(e){let i={name:"Bini.js App",short_name:"BiniApp",description:"Modern React application built with Bini.js",start_url:"/",display:"standalone",background_color:"#ffffff",theme_color:"#00CFFF",icons:[{src:"/favicon.ico",sizes:"64x64 32x32 24x24 16x16",type:"image/x-icon"},{src:"/apple-touch-icon.png",sizes:"180x180",type:"image/png"}]};await v(p.join(e,"public","site.webmanifest"),JSON.stringify(i,null,2));}async function he(e,i,n,r,o){let l=r==="Tailwind"?`import tailwindcss from '@tailwindcss/vite';
`:"",c=r==="Tailwind"?`
      tailwindcss(),`:"",s=i?`,
    types: ["vite/client"]`:"",f=o?`import { biniNative } from 'bini-native';
`:"",g=o?`
      biniNative(),`:"",b=["'**/dist/**'","'**/node_modules/**'"];o&&(b.push("'**/src-tauri/**'"),b.push("'**/target/**'"),b.push("'**/*.exe'"),b.push("'**/*.dll'"),b.push("'**/*.pdb'"));let d=b.join(`,
          `),u=`import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { biniroute } from 'bini-router';
import { biniOverlay } from 'bini-overlay';
import { biniEnv } from 'bini-env';
import { biniExport } from 'bini-export';
${f}${l}
import { existsSync } from 'fs';

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isBuild = command === 'build';
  const port = parseInt(env['PORT'] ?? '3000', 10);

  const isTauri = env['TAURI'] === 'true' ||
                  process.env.TAURI === 'true' ||
                  existsSync('./src-tauri');

  const tauriDevHost = process.env.TAURI_DEV_HOST;

  const host = tauriDevHost
    ? true
    : isTauri
      ? '0.0.0.0'
      : (env['CODESPACE_NAME'] ? '0.0.0.0' : 'localhost');

  const hmrConfig = env['CODESPACE_NAME']
    ? { clientPort: 443, overlay: false }
    : tauriDevHost
      ? {
          overlay: false,
          protocol: 'ws',
          host: tauriDevHost,
          port,
        }
      : {
          overlay: false,
          host: 'localhost',
          protocol: 'ws',
        };

  return {
    plugins: [${c}
      react(),
      biniroute({ platform: 'node' }),
      biniOverlay(),
      biniEnv(),
      biniExport(),${g}
    ],

    server: {
      port,
      host,
      open: !isTauri,
      cors: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
      hmr: hmrConfig,
      watch: {
        usePolling: !!env['CODESPACE_NAME'] || isTauri,
        ignored: [
          ${d}
        ],
      },
      strictPort: true,
    },

    preview: {
      port,
      host: '0.0.0.0',
      open: true,
      cors: true
    },

    build: {
      outDir: 'dist',
      sourcemap: !isBuild,
      emptyOutDir: true,
      minify: isBuild,
      cssCodeSplit: true,
      reportCompressedSize: true,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            const name = assetInfo.names?.[0] ?? assetInfo.name ?? '';
            const ext = name.split('.').pop() ?? '';
            if (/png|jpe?g|gif|svg|webp|avif/.test(ext)) return 'assets/images/[name]-[hash][extname]';
            if (/woff2?|eot|ttf|otf/.test(ext)) return 'assets/fonts/[name]-[hash][extname]';
            if (ext === 'css') return 'css/[name]-[hash][extname]';
            if (ext === 'json') return 'data/[name]-[hash][extname]';
            return 'assets/[name]-[hash][extname]';
          },
        },
      },
    },

    resolve: { alias: { '@': '/src' } },
    css: {
      modules: { localsConvention: 'camelCase' },
      devSourcemap: true
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom']
    }${s}
  };
});
`;await v(p.join(e,`vite.config.${n}`),u);}function we(e,i){let n={windows:`
----------------------------------------------------------------------
  Windows Setup Requirements
----------------------------------------------------------------------

  1. Microsoft C++ Build Tools
     Download: https://visualstudio.microsoft.com/visual-cpp-build-tools/
     Install with "Desktop development with C++"

  2. Microsoft Edge WebView2 Runtime
     Download: https://developer.microsoft.com/en-us/microsoft-edge/webview2/
     Install the Evergreen Bootstrapper

  3. Verify: Run "cl" in terminal after installation
----------------------------------------------------------------------`,linux:`
----------------------------------------------------------------------
  Linux Setup Requirements
----------------------------------------------------------------------

  Debian/Ubuntu:
    sudo apt update
    sudo apt install -y libwebkit2gtk-4.0-dev build-essential \\
      libssl-dev libgtk-3-dev libayatana-appindicator3-dev \\
      librsvg2-dev libxdo-dev pkg-config

  Fedora:
    sudo dnf groupinstall "C Development Tools and Libraries"
    sudo dnf install webkit2gtk4.0-devel openssl-devel \\
      gtk3-devel libappindicator-gtk3-devel librsvg2-devel \\
      libxdo-devel pkg-config

  Arch:
    sudo pacman -S webkit2gtk base-devel openssl gtk3 \\
      libappindicator-gtk3 librsvg libxdo pkg-config
----------------------------------------------------------------------`,macos:`
----------------------------------------------------------------------
  macOS Setup Requirements
----------------------------------------------------------------------

  1. Xcode Command Line Tools:
     xcode-select --install

  2. Homebrew:
     /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

  3. Tauri Dependencies:
     brew install gtk+3 webkit2gtk pkg-config

  4. iOS Development (optional):
     Install Xcode from Mac App Store
----------------------------------------------------------------------`,android:`
----------------------------------------------------------------------
  Android Setup Requirements
----------------------------------------------------------------------

  1. Java JDK 17
     Download: https://adoptium.net/temurin/releases/
     Set JAVA_HOME environment variable

  2. Android Studio
     Download: https://developer.android.com/studio
     Install SDK, Build Tools, and NDK
     Set ANDROID_HOME environment variable

  3. Rust Android Targets:
     rustup target add aarch64-linux-android armv7-linux-androideabi
     rustup target add i686-linux-android x86_64-linux-android
----------------------------------------------------------------------`,ios:`
----------------------------------------------------------------------
  iOS Setup Requirements (macOS only)
----------------------------------------------------------------------

  1. Xcode from Mac App Store
  2. Xcode Command Line Tools: xcode-select --install
  3. Cocoapods: sudo gem install cocoapods
  4. Rust iOS Targets:
     rustup target add aarch64-apple-ios
     rustup target add x86_64-apple-ios
     rustup target add aarch64-apple-ios-sim
----------------------------------------------------------------------`};return n[e==="ios"?"ios":e==="android"?"android":i==="windows"?"windows":i==="macos"?"macos":"linux"]||n.linux}function ye(e){let i=e.toLowerCase().replace(/[^a-z0-9]+/g,""),n=i.length>0?i:"app";return `com.bini.${/^[0-9]/.test(n)?`app${n}`:n}`}async function ve(e,i){let n=p.join(e,"tauri.conf.json");if(h.existsSync(n))try{let r=await x.readFile(n,"utf-8"),o=JSON.parse(r),l=ye(i);if(o.identifier===l){t.skip(`Bundle identifier already set to ${l}`);return}o.identifier=l,await x.writeFile(n,JSON.stringify(o,null,2)+`
`,{mode:416}),t.success(`Bundle identifier set to ${a.cyan}${l}${a.reset}`),t.info("Replace this with your own reverse-DNS identifier before publishing to an app store.");}catch(r){t.warn(`Could not set bundle identifier automatically: ${r.message}`),t.info(`Edit "identifier" in ${n} manually before building for Android/iOS/macOS.`);}}async function F(e,i,n){let r=[];if(n){for(let o of n.split(`
`))r.push(`# ${o}`);r.push("");}for(let[o,l]of Object.entries(i))r.push(`${o}=${l}`);await v(e,r.join(`
`)+`
`,{mode:384});}async function R(e,i){let n=p.join(e,".gitignore"),r="";try{r=await x.readFile(n,"utf-8");}catch{r="";}let o=new Set(r.split(`
`).map(s=>s.trim())),l=i.filter(s=>s.startsWith("#")||!o.has(s));if(l.length===0)return;let c=r.length>0&&!r.endsWith(`
`)?`
`:"";await x.appendFile(n,`${c}
${l.join(`
`)}
`,{mode:416});}async function K(e,i){let n=p.join(e,"tauri.conf.json");if(!h.existsSync(n))return t.warn(`Could not find ${n}.`),false;try{let r=await x.readFile(n,"utf-8"),o=JSON.parse(r);return i(o),await x.writeFile(n,JSON.stringify(o,null,2)+`
`,{mode:416}),!0}catch(r){return t.warn(`Could not update ${n}: ${r.message}`),false}}async function xe(e){let i=p.join(e,"app","build.gradle.kts");if(!h.existsSync(i)){t.warn(`Could not find ${i}. Wire up signingConfigs manually \u2014 see the docs.`);return}try{let n=await x.readFile(i,"utf-8");if(n.includes("keystore.properties")){t.skip("build.gradle.kts already configured for release signing.");return}n.includes("import java.io.FileInputStream")||(n=`import java.io.FileInputStream
${n}`),n.includes("import java.util.Properties")||(n=n.replace("import java.io.FileInputStream",`import java.io.FileInputStream
import java.util.Properties`));let r=`    signingConfigs {
        create("release") {
            val keystorePropertiesFile = rootProject.file("keystore.properties")
            val keystoreProperties = Properties()
            if (keystorePropertiesFile.exists()) {
                keystoreProperties.load(FileInputStream(keystorePropertiesFile))
            }

            keyAlias = keystoreProperties["keyAlias"] as String
            keyPassword = keystoreProperties["password"] as String
            storeFile = file(keystoreProperties["storeFile"] as String)
            storePassword = keystoreProperties["password"] as String
        }
    }

`;if(!/buildTypes\s*\{/.test(n)){t.warn(`Could not find "buildTypes" block in ${i}. Add signingConfigs manually.`);return}n=n.replace(/(\n[^\S\n]*buildTypes\s*\{)/,`
${r}$1`),/getByName\("release"\)\s*\{/.test(n)?n=n.replace(/(getByName\("release"\)\s*\{)/,`$1
            signingConfig = signingConfigs.getByName("release")`):t.warn(`Could not find getByName("release") in ${i}. Set signingConfig manually.`),await x.writeFile(i,n,{mode:416}),t.success("Wired release signingConfig into build.gradle.kts");}catch(n){t.warn(`Could not patch build.gradle.kts: ${n.message}`),t.info("Configure it manually \u2014 see https://v2.tauri.app/distribute/sign/android/");}}async function Xe(e,i,n){if(t.step("Android release signing"),!(n===true?true:await $({message:"Set up Android release signing now?",default:false}))){t.info("Skipped. See: https://v2.tauri.app/distribute/sign/android/");return}let o=p.join(i,"gen","android");if(!h.existsSync(o)){t.warn("Android project not found (src-tauri/gen/android missing). Run Android init first.");return}N("keytool")||t.warn("keytool not found on PATH (ships with the JDK). Add it to PATH or use Android Studio's copy.");let l=await $({message:"Do you already have a keystore (.jks) file?",default:false}),c,s,f;if(l)c=await input({message:"Path to existing keystore file:",validate:d=>h.existsSync(d)?true:"File not found."}),s=await input({message:"Key alias:",default:"upload"}),f=await password({message:"Keystore password:",mask:"*"});else {let d=p.join(e,"keystore.jks");if(c=await input({message:"Where should the keystore be created?",default:d}),s=await input({message:"Key alias:",default:"upload"}),f=await password({message:"Set a keystore password (min 6 chars):",mask:"*"}),h.existsSync(c))t.warn(`File already exists at ${c} \u2014 leaving it untouched.`);else {t.step("Generating keystore with keytool...");let u=`CN=${p.basename(e)}, OU=Dev, O=Bini, L=Unknown, S=Unknown, C=US`,X=`keytool -genkey -v -keystore "${c}" -keyalg RSA -keysize 2048 -validity 10000 -alias "${s}" -storepass "${f}" -keypass "${f}" -dname "${u}"`;try{O(X,{stdio:"pipe",timeout:3e4}),t.success(`Keystore created at ${c}`);}catch(k){t.warn(`Could not generate keystore automatically: ${k.message}`),t.info("Generate it manually with keytool \u2014 see https://v2.tauri.app/distribute/sign/android/");return}}}let g=p.join(o,"keystore.properties"),b=process.platform==="win32"?c.replace(/\\/g,"\\\\"):c;await v(g,`password=${f}
keyAlias=${s}
storeFile=${b}
`,{mode:384}),t.success(`Wrote ${p.relative(e,g)}`),await R(e,["# Android signing (never commit)","src-tauri/gen/android/keystore.properties","*.jks","*.keystore"]),await xe(o),t.success("Android release signing configured. `pnpm android:build` will now produce a signed release.");}async function $e(e,i){if(t.step("Windows code signing"),!(i===true?true:await $({message:"Configure Windows code signing now?",default:false}))){t.info("Skipped. See: https://v2.tauri.app/distribute/sign/windows/");return}t.plain(`${a.dim}Requires a code signing certificate already imported into your Windows
certificate store (Import-PfxCertificate). See the docs if you haven't done that yet.${a.reset}`);let r=await input({message:"Certificate thumbprint (Personal > Certificates > Details in certmgr.msc):",validate:s=>s.trim().length>0?true:"Required."}),o=await select({message:"Digest algorithm:",choices:[{name:"sha256",value:"sha256"},{name:"sha1",value:"sha1"}],default:"sha256"}),l=await input({message:"Timestamp server URL:",default:"http://timestamp.comodoca.com"});await K(e,s=>{s.bundle=s.bundle??{},s.bundle.windows={...s.bundle.windows??{},certificateThumbprint:r,digestAlgorithm:o,timestampUrl:l};})&&(t.success("Windows signing configured in tauri.conf.json"),t.info("Cross-compiling from Linux/macOS requires a custom signCommand instead \u2014 see the docs."));}async function ke(e,i,n){if(t.step("macOS code signing"),!(n===true?true:await $({message:"Configure macOS code signing now?",default:false}))){t.info("Skipped. See: https://v2.tauri.app/distribute/sign/macos/");return}let o=await select({message:"Signing method:",choices:[{name:"Ad-hoc (local testing, no Apple Developer account)",value:"adhoc"},{name:"Apple Developer signing identity (Distribution / Developer ID)",value:"identity"}],default:"adhoc"}),l=o==="adhoc"?"-":await input({message:'Signing identity (from "security find-identity -v -p codesigning"):',validate:d=>d.trim().length>0?true:"Required."});if(await K(i,d=>{d.bundle=d.bundle??{},d.bundle.macOS={...d.bundle.macOS??{},signingIdentity:l};})&&t.success(`macOS signingIdentity set to "${l}" in tauri.conf.json`),o!=="identity"||!await $({message:"Set up notarization credentials too? (avoids the 'unidentified developer' warning)",default:false}))return;let f=await select({message:"Notarization method:",choices:[{name:"App Store Connect API key",value:"apiKey"},{name:"Apple ID + app-specific password",value:"appleId"}],default:"apiKey"}),g={};f==="apiKey"?(g.APPLE_API_ISSUER=await input({message:"APPLE_API_ISSUER (Issuer ID):"}),g.APPLE_API_KEY=await input({message:"APPLE_API_KEY (Key ID):"}),g.APPLE_API_KEY_PATH=await input({message:"Path to downloaded .p8 private key:",validate:d=>h.existsSync(d)?true:"File not found."})):(g.APPLE_ID=await input({message:"Apple ID email:"}),g.APPLE_PASSWORD=await password({message:"App-specific password:",mask:"*"}),g.APPLE_TEAM_ID=await input({message:"Apple Team ID:"}));let b=p.join(e,".env.signing");await F(b,g,"macOS notarization credentials \u2014 never commit this file.\nRun `source .env.signing` before `pnpm tauri:build`."),await R(e,["# Code signing secrets (never commit)",".env.signing"]),t.success(`Wrote notarization credentials to ${p.relative(e,b)}`),t.info('Run "source .env.signing" before building to notarize your app.');}async function Se(e,i){if(t.step("Linux AppImage signing"),!(i===true?true:await $({message:"Configure AppImage signing (gpg) now?",default:false}))){t.info("Skipped. See: https://v2.tauri.app/distribute/sign/linux/");return}if(!N("gpg")&&!N("gpg2")){t.warn("gpg/gpg2 not found. Install it, generate a key with `gpg2 --full-gen-key`, then re-run.");return}let r=await input({message:"GPG key ID to sign with (blank = default key):"}),l={SIGN:"1",APPIMAGETOOL_SIGN_PASSPHRASE:await password({message:"GPG key passphrase:",mask:"*"})};r.trim()&&(l.SIGN_KEY=r.trim());let c=p.join(e,".env.signing");await F(c,l,"AppImage signing secrets \u2014 never commit this file.\nRun `source .env.signing` before `pnpm tauri:build`."),await R(e,["# Code signing secrets (never commit)",".env.signing"]),t.success(`Wrote AppImage signing config to ${p.relative(e,c)}`),t.info('Run "source .env.signing" before building to sign the AppImage.');}async function Ae(e,i){if(t.step("iOS code signing"),!(i===true?true:await $({message:"Configure iOS code signing now?",default:false}))){t.info("Skipped. Xcode-managed automatic signing is used by default.");return}if(await select({message:"Signing method:",choices:[{name:"Automatic (Xcode-managed, recommended for local builds)",value:"automatic"},{name:"Manual (certificate + provisioning profile, for CI)",value:"manual"}],default:"automatic"})==="automatic"){t.info("Nothing to configure locally \u2014 sign in with your Apple ID in Xcode (Settings > Accounts).");return}let o=await input({message:"Path to exported certificate (.p12):",validate:s=>h.existsSync(s)?true:"File not found."}),l=await password({message:"Certificate export password:",mask:"*"}),c=await input({message:"Path to provisioning profile (.mobileprovision):",validate:s=>h.existsSync(s)?true:"File not found."});try{let s=(await x.readFile(o)).toString("base64"),f=(await x.readFile(c)).toString("base64"),g=p.join(e,".env.signing");await F(g,{IOS_CERTIFICATE:s,IOS_CERTIFICATE_PASSWORD:l,IOS_MOBILE_PROVISION:f},"iOS manual signing secrets \u2014 never commit this file.\nRun `source .env.signing` before `pnpm tauri ios build`."),await R(e,["# Code signing secrets (never commit)",".env.signing"]),t.success(`Wrote iOS signing credentials to ${p.relative(e,g)}`),t.info('Run "source .env.signing" before building to sign your iOS app.');}catch(s){t.warn(`Could not read/encode certificate or profile: ${s.message}`);}}async function Pe(e,i,n,r){if(r===false){t.info("Skipping code signing setup (--nosign). See https://v2.tauri.app/distribute/sign/");return}if(!A()){t.info("Skipping code signing setup (non-interactive). See https://v2.tauri.app/distribute/sign/");return}switch(n){case "android":await Xe(e,i,r);break;case "windows":await $e(i,r);break;case "macos":await ke(e,i,r);break;case "linux":await Se(e,r);break;case "ios":await Ae(e,r);break}}async function Ce(e,i,n,r,o,l,c){t.step(`Setting up Tauri for ${i} on ${n}`),t.step("Installing Tauri dependencies...");let s=[{type:"dev",packages:["@tauri-apps/cli@latest","cross-env@latest","bini-native@latest"]},{type:"prod",packages:["@tauri-apps/api@latest"]}];for(let d of s){let u=d.type==="dev"?`${r} add -D ${d.packages.join(" ")}`:`${r} add ${d.packages.join(" ")}`;try{j(u,e);}catch{}}t.success("Tauri dependencies installed");let f=p.join(e,"src-tauri");if(h.existsSync(f))t.skip("Tauri already initialized");else {t.step("Initializing Tauri with auto-filled values...");let d=`npx @tauri-apps/cli init       --app-name "${l}"       --window-title "${l}"       --frontend-dist "../dist"       --dev-url "http://localhost:3000"       --before-dev-command "${m(r,"dev")}"       --before-build-command "${m(r,"build")}"       --force`;t.command(d);try{execSync(d,{cwd:e,stdio:"inherit",timeout:6e4,shell:process.platform==="win32"?"cmd.exe":"/bin/sh",env:{...process.env,FORCE_COLOR:"true"}}),t.success("Tauri initialized with auto-filled values");}catch{t.warn("Tauri init failed. Please run manually:"),t.plain(`  ${a.yellow}${d}${a.reset}`);return}}await ve(f,o);let g=p.join(f,"icons");if(h.existsSync(g)){t.step("Removing existing Tauri icons...");try{h.rmSync(g,{recursive:!0,force:!0}),t.success("Existing icons removed");}catch(d){t.warn(`Could not remove icons: ${d instanceof Error?d.message:String(d)}`);}}t.step("Generating Tauri icons from public/logo.png...");let b=D(r,"tauri icon public/logo.png");t.command(b);try{execSync(b,{cwd:e,stdio:"inherit",timeout:6e4,shell:process.platform==="win32"?"cmd.exe":"/bin/sh"}),t.success("Tauri icons generated from logo.png");}catch{t.warn("Could not generate icons automatically."),t.info(`Run: ${a.cyan}${b}${a.reset}`);}if(i==="android"){let d=p.join(e,"src-tauri","gen","android");if(h.existsSync(d))t.skip("Android support already initialized");else {t.step("Initializing Android support...");let u=D(r,"tauri android init");t.command(u);try{execSync(u,{cwd:e,stdio:"inherit",timeout:12e4,shell:process.platform==="win32"?"cmd.exe":"/bin/sh"}),t.success("Android support initialized");}catch{t.warn("Android init failed. Please run manually:"),t.plain(`  ${a.yellow}${u}${a.reset}`);}}}if(i==="ios"){let d=p.join(e,"src-tauri","gen","ios");if(h.existsSync(d))t.skip("iOS support already initialized");else {t.step("Initializing iOS support...");let u=D(r,"tauri ios init");if(t.command(u),n==="macos")try{execSync(u,{cwd:e,stdio:"inherit",timeout:12e4,shell:process.platform==="win32"?"cmd.exe":"/bin/sh"}),t.success("iOS support initialized");}catch{t.warn(`iOS init failed. Please run manually: ${u}`);}else t.warn("iOS initialization skipped (requires macOS)");}}if(await Pe(e,f,i,c),t.step("Setup Instructions"),t.plain(we(i,n)),t.step("Checking prerequisites..."),i==="android"){N("java")||t.warn("Java JDK 17 not found (required for Android)"),process.env.ANDROID_HOME||t.warn("ANDROID_HOME not set (required for Android)"),t.step("Adding Rust Android targets");let d=["aarch64-linux-android","armv7-linux-androideabi","i686-linux-android","x86_64-linux-android"];for(let u of d){t.command(`rustup target add ${u}`);try{execSync(`rustup target list | grep ${u}`,{stdio:"pipe",shell:process.platform==="win32"?"cmd.exe":"/bin/sh"}).toString().includes("installed")||j(`rustup target add ${u}`,e);}catch{j(`rustup target add ${u}`,e);}}t.success("Rust Android targets ready");}if(i==="ios"&&n!=="macos"&&t.warn("iOS development requires macOS with Xcode"),n==="windows"&&i==="windows"&&!N("cl")&&t.warn("Visual Studio Build Tools not found (required for Windows)"),t.success(`Tauri setup complete for ${i}`),t.step("Available Commands"),i==="android"){let d=m(r,"android"),u=m(r,"android:build");t.plain(`
  ${a.green}${a.bold}Run on Android:${a.reset} ${a.cyan}${d}${a.reset}`),t.plain(`  ${a.green}${a.bold}Build APK:${a.reset} ${a.cyan}${u}${a.reset}`),t.plain(`  ${a.green}${a.bold}Manual Command:${a.reset} ${a.dim}npx @tauri-apps/cli android dev${a.reset}
`),t.plain(`  ${a.yellow}${a.bold}Quick Start Guide:${a.reset}`),t.plain("  1. Start an Android emulator or connect a device with USB debugging"),t.plain(`  2. Run: ${a.green}${d}${a.reset}`),t.plain(`  3. Build APK: ${a.green}${u}${a.reset}
`);}else {let u={windows:{dev:m(r,"tauri:dev"),build:m(r,"tauri:build")},linux:{dev:m(r,"tauri:dev"),build:m(r,"tauri:build")},macos:{dev:m(r,"tauri:dev"),build:m(r,"tauri:build")},android:{dev:m(r,"android"),build:m(r,"android:build")},ios:{dev:m(r,"ios"),build:m(r,"ios:build")}}[i];t.plain(`
  ${a.green}${a.bold}Development:${a.reset} ${u.dev}`),t.plain(`  ${a.green}${a.bold}Build:${a.reset} ${u.build}
`);}}function Ee(){return `* { box-sizing: border-box; }
html { font-family: system-ui, -apple-system, 'Segoe UI', sans-serif; -webkit-font-smoothing: antialiased; }
body { line-height: 1.5; min-height: 100vh; margin: 0; }
#root { min-height: 100vh; }
`}function Te(){return `.root { 
  min-height: 100vh; 
  background: #ffffff; 
  display: flex; 
  flex-direction: column; 
}

.hero { 
  flex: 1; 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  justify-content: center; 
  text-align: center; 
  padding: 3rem 1rem; 
  gap: 1rem; 
}

@media (min-width: 640px) {
  .hero { padding: 5rem 2rem; gap: 1.5rem; }
}

.hero-logo { 
  width: 4rem; 
  height: 4rem; 
  object-fit: contain;
}

@media (min-width: 640px) {
  .hero-logo { width: 5rem; height: 5rem; }
}

.gradient-text-wrap {
  display: inline-block;
  overflow: visible;
  position: relative;
}

.gradient-text {
  background: linear-gradient(to right, #22D3EE, #3B82F6);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  -webkit-mask-image: none;
  mask-image: none;
  padding-bottom: 0.2em;
  padding-top: 0.05em;
  margin-bottom: -0.15em;
  line-height: 1.2;
}

.gradient-text-fallback {
  position: absolute;
  color: #3B82F6;
  opacity: 0;
  pointer-events: none;
}

.title { 
  font-size: 1.875rem; 
  font-weight: 700; 
  letter-spacing: -0.04em; 
  color: #000000; 
  margin: 0; 
  line-height: 1.1; 
}

@media (min-width: 640px) {
  .title { font-size: 2.25rem; }
}

@media (min-width: 768px) {
  .title { font-size: 3rem; }
}

@media (min-width: 1024px) {
  .title { font-size: 3.75rem; }
}

.gradient { 
  background: linear-gradient(to right, #22D3EE, #3B82F6); 
  -webkit-background-clip: text; 
  -webkit-text-fill-color: transparent; 
  background-clip: text; 
}

.subtitle { 
  font-size: 1rem; 
  color: #737373; 
  margin: 0; 
  max-width: 28rem; 
  line-height: 1.6; 
  padding: 0 1rem;
}

@media (min-width: 640px) {
  .subtitle { font-size: 1.125rem; padding: 0; }
}

.hint { 
  font-size: 0.75rem; 
  color: #a3a3a3; 
  margin: 0; 
  padding: 0 1rem;
}

@media (min-width: 640px) {
  .hint { font-size: 0.875rem; padding: 0; }
}

.platforms { 
  display: flex; 
  flex-wrap: wrap; 
  align-items: center; 
  justify-content: center; 
  gap: 0.375rem; 
  padding: 0 0.5rem;
}

@media (min-width: 640px) {
  .platforms { gap: 0.5rem; padding: 0; }
}

.platform-badge { 
  font-size: 0.625rem; 
  font-weight: 500; 
  color: #737373; 
  background: #f5f5f5; 
  border: 1px solid #e5e5e5; 
  border-radius: 9999px; 
  padding: 0.125rem 0.625rem; 
}

@media (min-width: 640px) {
  .platform-badge { 
    font-size: 0.75rem; 
    padding: 0.25rem 0.75rem; 
  }
}

.code { 
  font-family: monospace; 
  font-size: 0.625rem; 
  background: #f5f5f5; 
  color: #404040; 
  padding: 0.125rem 0.375rem; 
  border-radius: 4px; 
  border: 1px solid #e5e5e5; 
}

@media (min-width: 640px) {
  .code { font-size: 0.75rem; padding: 0.2rem 0.5rem; }
}

.links-section { 
  padding: 0 1rem 3rem; 
}

@media (min-width: 640px) {
  .links-section { padding: 0 2rem 4rem; }
}

.grid { 
  display: grid; 
  grid-template-columns: repeat(2, 1fr); 
  gap: 0.75rem; 
  max-width: 48rem; 
  margin: 0 auto; 
}

@media (min-width: 640px) {
  .grid { gap: 1rem; }
}

@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(4, 1fr); gap: 1rem; }
}

.card { 
  display: flex; 
  flex-direction: column; 
  gap: 0.375rem; 
  padding: 0.75rem; 
  border-radius: 10px; 
  border: 1px solid #e5e5e5; 
  text-decoration: none; 
  transition: border-color 0.15s, background 0.15s; 
}

@media (min-width: 640px) {
  .card { gap: 0.5rem; padding: 1.25rem; }
}

.card:hover { 
  border-color: #d4d4d4; 
  background: #fafafa; 
}

.card-label { 
  font-size: 0.75rem; 
  font-weight: 600; 
  color: #000000; 
}

@media (min-width: 640px) {
  .card-label { font-size: 0.875rem; }
}

.card-desc { 
  font-size: 0.625rem; 
  color: #737373; 
  line-height: 1.5; 
}

@media (min-width: 640px) {
  .card-desc { font-size: 0.75rem; }
}

@media (prefers-color-scheme: dark) {
  .root { background: #000000; }
  .title { color: #ffffff; }
  .subtitle { color: #737373; }
  .hint { color: #525252; }
  .platform-badge { background: #111111; border-color: #222222; color: #a3a3a3; }
  .code { background: #111111; color: #d4d4d4; border-color: #222222; }
  .card { border-color: #1a1a1a; }
  .card:hover { border-color: #333333; background: #0a0a0a; }
  .card-label { color: #ffffff; }
  .card-desc { color: #737373; }
}
`}function Ne(){return `.root { 
  min-height: 100vh; 
  background: #ffffff; 
  display: flex; 
  flex-direction: column; 
}

.hero { 
  flex: 1; 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  justify-content: center; 
  text-align: center; 
  padding: 3rem 1rem; 
  gap: 1rem; 
}

@media (min-width: 640px) {
  .hero { padding: 5rem 2rem; gap: 1.5rem; }
}

.heroLogo { 
  width: 4rem; 
  height: 4rem; 
  object-fit: contain;
}

@media (min-width: 640px) {
  .heroLogo { width: 5rem; height: 5rem; }
}

.gradientTextWrap {
  display: inline-block;
  overflow: visible;
  position: relative;
}

.gradientText {
  background: linear-gradient(to right, #22D3EE, #3B82F6);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  -webkit-mask-image: none;
  mask-image: none;
  padding-bottom: 0.2em;
  padding-top: 0.05em;
  margin-bottom: -0.15em;
  line-height: 1.2;
}

.gradientTextFallback {
  position: absolute;
  color: #3B82F6;
  opacity: 0;
  pointer-events: none;
}

.title { 
  font-size: 1.875rem; 
  font-weight: 700; 
  letter-spacing: -0.04em; 
  color: #000000; 
  margin: 0; 
  line-height: 1.1; 
}

@media (min-width: 640px) {
  .title { font-size: 2.25rem; }
}

@media (min-width: 768px) {
  .title { font-size: 3rem; }
}

@media (min-width: 1024px) {
  .title { font-size: 3.75rem; }
}

.gradient { 
  background: linear-gradient(to right, #22D3EE, #3B82F6); 
  -webkit-background-clip: text; 
  -webkit-text-fill-color: transparent; 
  background-clip: text; 
}

.subtitle { 
  font-size: 1rem; 
  color: #737373; 
  margin: 0; 
  max-width: 28rem; 
  line-height: 1.6; 
  padding: 0 1rem;
}

@media (min-width: 640px) {
  .subtitle { font-size: 1.125rem; padding: 0; }
}

.hint { 
  font-size: 0.75rem; 
  color: #a3a3a3; 
  margin: 0; 
  padding: 0 1rem;
}

@media (min-width: 640px) {
  .hint { font-size: 0.875rem; padding: 0; }
}

.platforms { 
  display: flex; 
  flex-wrap: wrap; 
  align-items: center; 
  justify-content: center; 
  gap: 0.375rem; 
  padding: 0 0.5rem;
}

@media (min-width: 640px) {
  .platforms { gap: 0.5rem; padding: 0; }
}

.platformBadge { 
  font-size: 0.625rem; 
  font-weight: 500; 
  color: #737373; 
  background: #f5f5f5; 
  border: 1px solid #e5e5e5; 
  border-radius: 9999px; 
  padding: 0.125rem 0.625rem; 
}

@media (min-width: 640px) {
  .platformBadge { 
    font-size: 0.75rem; 
    padding: 0.25rem 0.75rem; 
  }
}

.code { 
  font-family: monospace; 
  font-size: 0.625rem; 
  background: #f5f5f5; 
  color: #404040; 
  padding: 0.125rem 0.375rem; 
  border-radius: 4px; 
  border: 1px solid #e5e5e5; 
}

@media (min-width: 640px) {
  .code { font-size: 0.75rem; padding: 0.2rem 0.5rem; }
}

.linksSection { 
  padding: 0 1rem 3rem; 
}

@media (min-width: 640px) {
  .linksSection { padding: 0 2rem 4rem; }
}

.grid { 
  display: grid; 
  grid-template-columns: repeat(2, 1fr); 
  gap: 0.75rem; 
  max-width: 48rem; 
  margin: 0 auto; 
}

@media (min-width: 640px) {
  .grid { gap: 1rem; }
}

@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(4, 1fr); gap: 1rem; }
}

.card { 
  display: flex; 
  flex-direction: column; 
  gap: 0.375rem; 
  padding: 0.75rem; 
  border-radius: 10px; 
  border: 1px solid #e5e5e5; 
  text-decoration: none; 
  transition: border-color 0.15s, background 0.15s; 
}

@media (min-width: 640px) {
  .card { gap: 0.5rem; padding: 1.25rem; }
}

.card:hover { 
  border-color: #d4d4d4; 
  background: #fafafa; 
}

.cardLabel { 
  font-size: 0.75rem; 
  font-weight: 600; 
  color: #000000; 
}

@media (min-width: 640px) {
  .cardLabel { font-size: 0.875rem; }
}

.cardDesc { 
  font-size: 0.625rem; 
  color: #737373; 
  line-height: 1.5; 
}

@media (min-width: 640px) {
  .cardDesc { font-size: 0.75rem; }
}

@media (prefers-color-scheme: dark) {
  .root { background: #000000; }
  .title { color: #ffffff; }
  .subtitle { color: #737373; }
  .hint { color: #525252; }
  .platformBadge { background: #111111; border-color: #222222; color: #a3a3a3; }
  .code { background: #111111; color: #d4d4d4; border-color: #222222; }
  .card { border-color: #1a1a1a; }
  .card:hover { border-color: #333333; background: #0a0a0a; }
  .cardLabel { color: #ffffff; }
  .cardDesc { color: #737373; }
}
`}function Oe(e){let i=Ee();return e==="Tailwind"?`@import "tailwindcss";

${i}`:e==="CSS Modules"?i:i+`
`+Te()}function Re(e,i,n,r){let o=r!=="web",l={react:"latest","react-dom":"latest","react-router-dom":"latest",hono:"latest","bini-router":"latest","bini-overlay":"latest","bini-server":"latest"},c={"@vitejs/plugin-react":"latest",vite:"latest",oxlint:"latest",oxfmt:"latest","bini-env":"latest","bini-export":"latest"};o&&(c["@tauri-apps/cli"]="latest",c["cross-env"]="latest",c["bini-native"]="latest",l["@tauri-apps/api"]="latest"),i&&Object.assign(c,{"@types/react":"latest","@types/react-dom":"latest","@types/node":"latest",typescript:"latest"}),n==="Tailwind"&&Object.assign(c,{tailwindcss:"latest","@tailwindcss/vite":"latest"});let s={dev:o?"vite":"vite --host --open",build:i?"tsc --noEmit && vite build":"vite build",export:"vite build --mode export",start:"bini-server",preview:"vite preview --host --open","type-check":i?"tsc --noEmit":"echo 'TypeScript not enabled'",lint:"oxlint src",format:"oxfmt src",check:i?"oxlint src && oxfmt src && tsc --noEmit":"oxlint src && oxfmt src"};return o&&(s.predev="npx @tauri-apps/cli icon public/logo.png",s.prebuild="npx @tauri-apps/cli icon public/logo.png",s["tauri:dev"]="cross-env TAURI=true tauri dev",s["tauri:build"]="cross-env TAURI=true tauri build",s["tauri:icon"]="npx @tauri-apps/cli icon public/logo.png",s.android="npx @tauri-apps/cli android dev",s["android:dev"]="npx @tauri-apps/cli android dev",s["android:build"]="npx @tauri-apps/cli android build",s.ios="npx @tauri-apps/cli ios dev",s["ios:dev"]="npx @tauri-apps/cli ios dev",s["ios:build"]="npx @tauri-apps/cli ios build"),r==="ios"&&(s.tauri="tauri"),{name:e,type:"module",version:"1.0.0",scripts:s,dependencies:l,devDependencies:c}}var B=`[
  { label: 'Docs',     desc: 'Read the documentation',   href: 'https://bini.js.org'                           },
  { label: 'Examples', desc: 'Browse starter templates', href: 'https://github.com/Binidu01/bini-examples'     },
  { label: 'npm',      desc: 'View on npm registry',     href: 'https://www.npmjs.com/package/create-bini-app' },
  { label: 'GitHub',   desc: 'Star us on GitHub',        href: 'https://github.com/Binidu01'                   },
]`,M="['Web', 'Windows', 'macOS', 'Linux', 'Android', 'iOS']";function Ie(e,i){let n=e==="tsx";return i==="Tailwind"?`import React from 'react';

const links = ${B};
const platforms = ${M};

${n?`interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

`:""}const GradientText = ${n?"({ children, className = '' }: GradientTextProps)":"({ children, className = '' })"} => {
  return (
    <span className={\`inline-block \${className}\`} style={{ overflow: 'visible' }}>
      <span
        style={{
          background: 'linear-gradient(to right, #22D3EE, #3B82F6)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          WebkitTextFillColor: 'transparent',
          display: 'inline-block',
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
          WebkitMaskImage: 'none',
          maskImage: 'none',
          paddingBottom: '0.2em',
          paddingTop: '0.05em',
          marginBottom: '-0.15em',
          lineHeight: '1.2',
        }}
      >
        {children}
      </span>
      <span
        style={{
          position: 'absolute',
          color: '#3B82F6',
          opacity: 0,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        {children}
      </span>
    </span>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-8 py-12 sm:py-20 gap-4 sm:gap-6">
        <img 
          src="/logo.png" 
          alt="Bini.js Logo" 
          className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
        />
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black dark:text-white">
          Welcome to{' '}
          <GradientText className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Bini.js
          </GradientText>
        </h1>
        
        <p className="text-base sm:text-lg text-neutral-500 dark:text-neutral-400 max-w-md px-4 sm:px-0">
          Build full-stack React apps that run on web, desktop, and mobile \u2014 powered by Tauri.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-2">
          {platforms.map((p) => (
            <span key={p}
              className="text-[10px] sm:text-xs font-medium text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full px-2.5 sm:px-3 py-0.5 sm:py-1">
              {p}
            </span>
          ))}
        </div>
        
        <p className="text-xs sm:text-sm text-neutral-400 dark:text-neutral-500 px-4">
          Get started by editing{' '}
          <code className="font-mono text-[10px] sm:text-xs bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 px-1.5 py-0.5 rounded border border-neutral-200 dark:border-neutral-800">
            src/app/page.${e}
          </code>
        </p>
      </main>
      
      <section className="px-4 sm:px-8 pb-12 sm:pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
          {links.map((l) => (
            <a 
              key={l.label} 
              href={l.href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col gap-1.5 sm:gap-2 p-3 sm:p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-950 transition-colors"
            >
              <span className="text-xs sm:text-sm font-semibold text-black dark:text-white">{l.label} \u2197</span>
              <span className="text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">{l.desc}</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
`:i==="CSS Modules"?`import React from 'react';
import styles from './page.module.css';

const links = ${B};
const platforms = ${M};

${n?`interface GradientTextProps {
  children: React.ReactNode;
}

`:""}const GradientText = ${n?"({ children }: GradientTextProps)":"({ children })"} => {
  return (
    <span className={styles.gradientTextWrap}>
      <span className={styles.gradientText}>{children}</span>
      <span className={styles.gradientTextFallback} aria-hidden="true">{children}</span>
    </span>
  );
};

export default function Home() {
  return (
    <div className={styles.root}>
      <main className={styles.hero}>
        <img src="/logo.png" alt="Bini.js Logo" className={styles.heroLogo} />

        <h1 className={styles.title}>
          Welcome to <GradientText>Bini.js</GradientText>
        </h1>

        <p className={styles.subtitle}>
          Build full-stack React apps that run on web, desktop, and mobile \u2014 powered by Tauri.
        </p>

        <div className={styles.platforms}>
          {platforms.map((p) => (
            <span key={p} className={styles.platformBadge}>{p}</span>
          ))}
        </div>

        <p className={styles.hint}>
          Get started by editing <code className={styles.code}>src/app/page.${e}</code>
        </p>
      </main>

      <section className={styles.linksSection}>
        <div className={styles.grid}>
          {links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className={styles.card}>
              <span className={styles.cardLabel}>{l.label} \u2197</span>
              <span className={styles.cardDesc}>{l.desc}</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
`:`import React from 'react';
import './globals.css';

const links = ${B};
const platforms = ${M};

${n?`interface GradientTextProps {
  children: React.ReactNode;
}

`:""}const GradientText = ${n?"({ children }: GradientTextProps)":"({ children })"} => {
  return (
    <span className="gradient-text-wrap">
      <span className="gradient-text">{children}</span>
      <span className="gradient-text-fallback" aria-hidden="true">{children}</span>
    </span>
  );
};

export default function Home() {
  return (
    <div className="root">
      <main className="hero">
        <img src="/logo.png" alt="Bini.js Logo" className="hero-logo" />

        <h1 className="title">
          Welcome to <GradientText>Bini.js</GradientText>
        </h1>

        <p className="subtitle">
          Build full-stack React apps that run on web, desktop, and mobile \u2014 powered by Tauri.
        </p>

        <div className="platforms">
          {platforms.map((p) => (
            <span key={p} className="platform-badge">{p}</span>
          ))}
        </div>

        <p className="hint">
          Get started by editing <code className="code">src/app/page.${e}</code>
        </p>
      </main>

      <section className="links-section">
        <div className="grid">
          {links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="card">
              <span className="card-label">{l.label} \u2197</span>
              <span className="card-desc">{l.desc}</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
`}async function je(e,i,n,r,o){let l=p.join(e,"src/app"),c=n?"{ children }: { children: React.ReactNode }":"{ children }",s=`import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
${o?`import { openUrl } from '@tauri-apps/plugin-opener';
import { Hono } from 'hono';`:""}

const container = document.getElementById('root');
if (!container) throw new Error('Root container not found');

${o?`
const isTauri = typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;

if (isTauri) {
  const apiApp = new Hono();
  const modules = import.meta.glob('./app/api/*.{ts,tsx,js,jsx}', { eager: true })${n?" as Record<string, { default: Hono }>":""};

  for (const mod of Object.values(modules)) {
    apiApp.route('/api', ${n?"(mod as { default: Hono }).default":"mod.default"});
  }

  const originalFetch = window.fetch.bind(window);
  window.fetch = async (input, init) => {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;
    const requestPath = new URL(url, window.location.origin).pathname;

    if (requestPath.startsWith('/api/')) {
      return apiApp.fetch(new Request(url, init));
    }
    return originalFetch(input, init);
  };
}

if (isTauri) {
  document.addEventListener('click', async (e) => {
    const anchor = (e.target${n?" as HTMLElement":""}).closest('a');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('?') || (href.startsWith('/') && !href.startsWith('//'))) {
      return;
    }

    if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
      return;
    }

    try {
      const url = new URL(href, window.location.origin);
      if (url.origin !== window.location.origin) {
        e.preventDefault();
        e.stopPropagation();
        await openUrl(href);
      }
    } catch (err) {
      console.error('Failed to open external link:', err);
    }
  }, true);
}
`:""}

createRoot(container).render(<App />);
`;await Promise.all([v(p.join(e,"src",`main.${i}`),s),v(p.join(l,`layout.${i}`),`import React from 'react';
import './globals.css';

export const metadata = {
  title      : 'Bini.js App',
  description: 'Modern React application built with Bini.js',
  keywords   : ['Bini.js', 'React', 'Vite'],
  themeColor : '#00CFFF',
  manifest   : '/site.webmanifest',
  openGraph: {
    title      : 'Bini.js App',
    description: 'Modern React application built with Bini.js',
    images     : [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card   : 'summary_large_image',
    title  : 'Bini.js App',
    creator: '@binidu01',
    images : ['/og-image.png'],
  },
  icons: {
    icon : [{ url: '/favicon.ico', type: 'image/x-icon' }],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
};

export default function RootLayout(${c}) {
  return <React.Fragment>{children}</React.Fragment>;
}
`),v(p.join(l,`page.${i}`),Ie(i,r))]);}async function De(e,i){await v(p.join(e,`src/app/api/hello.${i}`),`import { Hono } from 'hono'

const app = new Hono()

app.all('/hello', (c) => {
  return c.json({
    message  : 'Hello from Bini.js!',
    timestamp: new Date().toISOString(),
    method   : c.req.method,
  })
})

export default app
`);}function Be(e,i){switch(e){case "android":{let n=m(i,"android"),r=m(i,"android:dev"),o=m(i,"android:build");return {features:["Builds a real native APK/AAB via Tauri's Android backend \u2014 not a WebView wrapper bolted on after the fact.","Native plugin wiring (camera, filesystem, notifications, geolocation, etc.) handled automatically by `bini-native` based on the web APIs you actually call.","Hardware back button, status bar color, and splash screen are configurable through `src-tauri/gen/android`.","Release signing (keystore + `keystore.properties`) can be configured during scaffolding or later \u2014 see the Code Signing note below."],commandsTable:`| Command | Description |
|---------|-------------|
| \`${n}\` / \`${r}\` | Run on a connected Android emulator or device |
| \`${o}\` | Build a release APK/AAB |
| \`npx @tauri-apps/cli android dev\` | Manual equivalent of \`${n}\` |
| \`npx @tauri-apps/cli android build\` | Manual equivalent of \`${o}\` |`,quickStart:["Start an Android emulator, or connect a physical device with USB debugging enabled.",`Run \`${n}\`.`,`Build a release artifact with \`${o}\` once signing is configured.`]}}case "ios":{let n=m(i,"ios"),r=m(i,"ios:dev"),o=m(i,"ios:build");return {features:["Builds a real native iOS app via Tauri's iOS backend, using WKWebView under the hood.","Native plugin wiring handled automatically by `bini-native`, mirroring the Android plugin story.","Xcode-managed automatic signing works out of the box for local runs; manual certificate/profile signing is supported for CI (see Code Signing).","Requires macOS + Xcode \u2014 iOS builds cannot be produced from Windows or Linux."],commandsTable:`| Command | Description |
|---------|-------------|
| \`${n}\` / \`${r}\` | Run on the iOS Simulator or a connected device |
| \`${o}\` | Build the iOS app |
| \`npx @tauri-apps/cli ios dev\` | Manual equivalent of \`${n}\` |
| \`npx @tauri-apps/cli ios build\` | Manual equivalent of \`${o}\` |

> This project also includes a bare \`${m(i,"tauri")}\` script. Xcode's generated Run Script build phase calls it directly (\`npm run tauri -- ios xcode-script ...\`), bypassing the commands above \u2014 don't rename or remove it, or builds triggered from within Xcode itself will fail with \`Missing script: "tauri"\`.`,quickStart:["Make sure Xcode is installed and you're signed in with an Apple ID (Xcode > Settings > Accounts).",`Run \`${n}\` to launch the Simulator build.`,`Run \`${o}\` to produce a build for TestFlight / App Store submission.`]}}case "windows":case "linux":case "macos":{let n=e==="windows"?"Windows":e==="macos"?"macOS":"Linux",r=m(i,"tauri:dev"),o=m(i,"tauri:build"),l=m(i,"tauri:icon");return {features:[`Ships a native ${n} desktop binary \u2014 the frontend runs inside the OS's system webview (WebView2 on Windows, WebKitGTK on Linux, WKWebView on macOS), so bundle sizes stay small.`,"Full access to the filesystem, clipboard, notifications, and dialogs via `@tauri-apps/api`, auto-wired by `bini-native` as you use them.","External links open in the user's default browser instead of the app window.",`Code signing (${e==="windows"?"Authenticode certificate":e==="macos"?"Developer ID + notarization":"GPG-signed AppImage"}) can be configured during scaffolding or later \u2014 see the Code Signing note below.`],commandsTable:`| Command | Description |
|---------|-------------|
| \`${r}\` | Start the app in development mode |
| \`${o}\` | Build a distributable ${n} binary |
| \`${l}\` | Regenerate app icons from \`public/logo.png\` |`,quickStart:[`Run \`${r}\` to launch the desktop app.`,`Run \`${o}\` when you're ready to produce a distributable build.`]}}}}function Me(e,i,n,r,o,l){let c="";if(o&&l){let{features:f,commandsTable:g,quickStart:b}=Be(l,r),d=l==="windows"?"Windows":l==="macos"?"macOS":l==="linux"?"Linux":l==="android"?"Android":"iOS";c=`
## ${d} Desktop / Mobile Support

This project includes Tauri, targeting **${d}**.

API routes under \`src/app/api/\` work identically in both web and packaged
builds. In the packaged app (no server process available), requests to
\`/api/*\` are routed directly into Hono's \`fetch()\` entrypoint in-memory \u2014
no extra process, and no changes needed to your route files.

### ${d}-specific features

${f.map(u=>`- ${u}`).join(`
`)}

### Native wiring is automatic (bini-native)

All Rust-side wiring \u2014 plugin registration in \`lib.rs\`, \`Cargo.toml\`
dependencies, capability permissions, and Android/iOS/macOS manifest
entries \u2014 is handled at dev/build time by the [\`bini-native\`](https://www.npmjs.com/package/bini-native)
Vite plugin, already wired into \`vite.config.${n.config}\`. It scans your
frontend source and wires exactly what you use \u2014 nothing to configure in
\`src-tauri/\` by hand.

Baseline plugins (opener, dialog, filesystem, clipboard, notifications, OS
info) are wired unconditionally on every \`tauri dev\`/\`tauri build\` run.
Optional plugins \u2014 geolocation, global shortcuts, autostart, persistent
store \u2014 are installed and wired automatically the moment you use the
corresponding web API in your code. See the
[bini-native docs](https://www.npmjs.com/package/bini-native) for the full
API-to-plugin mapping.

> **App name & window title:** both were set from the app name you gave
> during scaffolding. Change them any time via \`productName\` and
> \`app.windows[].title\` in \`src-tauri/tauri.conf.json\`.

> **Bundle identifier:** generated as \`com.bini.<projectname>\` in
> \`src-tauri/tauri.conf.json\` so it doesn't collide with Tauri's default
> placeholder. Replace it with your own reverse-DNS identifier before
> publishing to an app store.

> **Code signing:** if configured during scaffolding, secrets live in a
> git-ignored \`.env.signing\` file at the project root (\`source .env.signing\`
> before building) and, for Android, in
> \`src-tauri/gen/android/keystore.properties\`. Neither file is ever
> committed. See https://v2.tauri.app/distribute/sign/ for the full guide.

### Quick start

${b.map((u,X)=>`${X+1}. ${u}`).join(`
`)}

### ${d} commands

${g}
`;}let s=o?l==="android"?m(r,"android"):l==="ios"?m(r,"ios"):m(r,"tauri:dev"):m(r,"dev");return `# ${e}

A Bini.js app \u2014 zero-config React framework.

## Quick Start${o?` (${l})`:""}

\`\`\`bash
${r} install
${s}
\`\`\`
${c}
## Production

\`\`\`bash
${r} run build
\`\`\`

## Linting, Formatting & Type Checking

\`\`\`bash
${r} run lint         # Oxlint \u2014 50-100x faster than ESLint
${r} run format       # Oxfmt  \u2014 Prettier-compatible formatter
${r} run type-check   # tsc --noEmit${i?"":" (TypeScript not enabled)"}
${r} run check        # lint + format + type-check combined (great for CI)
\`\`\`

## API Routes

Create files in \`src/app/api/\`. Export a Hono app:

\`\`\`${i?"typescript":"javascript"}
// src/app/api/hello.${n.api}
import { Hono } from 'hono'

const app = new Hono()

app.get('/hello', (c) => c.json({ message: 'Hello!' }))

export default app
\`\`\`

Access at \`http://localhost:3000/api/hello\`
${o?`
New route files are auto-discovered in both web and packaged builds \u2014 no manual wiring needed.`:""}

## File Structure

\`\`\`
${e}/
\u251C\u2500\u2500 src/
\u2502   \u251C\u2500\u2500 app/
\u2502   \u2502   \u251C\u2500\u2500 api/              \u2190 API routes (Hono)
\u2502   \u2502   \u251C\u2500\u2500 layout.${n.main}       \u2190 root layout + metadata
\u2502   \u2502   \u251C\u2500\u2500 page.${n.main}         \u2190 /
\u2502   \u2502   \u2514\u2500\u2500 globals.css
\u2502   \u251C\u2500\u2500 App.${n.main}               \u2190 auto-generated by bini-router \u2014 do not edit
\u2502   \u2514\u2500\u2500 main.${n.main}              \u2190 mounts <App />
\u251C\u2500\u2500 public/
\u2502   \u251C\u2500\u2500 favicon.ico
\u2502   \u251C\u2500\u2500 apple-touch-icon.png
\u2502   \u251C\u2500\u2500 og-image.png
\u2502   \u251C\u2500\u2500 logo.png             \u2190 Used for Tauri app icons
\u2502   \u2514\u2500\u2500 site.webmanifest
\u251C\u2500\u2500 .oxlintrc.json
\u251C\u2500\u2500 .oxfmtrc.json
\u251C\u2500\u2500 vite.config.${n.config}
\u2514\u2500\u2500 package.json
\`\`\`
${c}
## Powered by

- **Vite** \u2014 Rolldown-powered builds
- **bini-router** \u2014 filesystem routing + API middleware
- **bini-export** \u2014 static SPA export
- **bini-overlay** \u2014 dev overlay badge
- **bini-env** \u2014 environment file loading
- **bini-server** \u2014 production server (zero dependencies)
- **Oxlint** \u2014 fast Rust-based linter
- **Oxfmt** \u2014 fast Prettier-compatible formatter${i?`
- **TypeScript** \u2014 full type safety`:""}
${o?`
- **Tauri** \u2014 desktop/mobile application framework
- **bini-native** \u2014 automatic Tauri native wiring`:""}

---

**Built with Bini.js v${H}** | [Documentation](https://bini.js.org)
`}async function Fe(e){await v(p.join(e,"tsconfig.json"),JSON.stringify({compilerOptions:{target:"ES2022",lib:["ES2022","DOM","DOM.Iterable"],module:"ESNext",skipLibCheck:true,moduleResolution:"bundler",allowImportingTsExtensions:true,allowArbitraryExtensions:true,resolveJsonModule:true,isolatedModules:true,noEmit:true,jsx:"react-jsx",strict:true,paths:{"@/*":["./src/*"]},forceConsistentCasingInFileNames:true,types:["vite/client"]},include:["src"],exclude:["node_modules","dist"]},null,2));}async function _e(e){await v(p.join(e,".oxlintrc.json"),JSON.stringify({$schema:"./node_modules/oxlint/configuration_schema.json",plugins:["react"],env:{browser:true,es2022:true},ignorePatterns:["dist","node_modules"]},null,2)),await v(p.join(e,".oxfmtrc.json"),JSON.stringify({semi:false,singleQuote:true,tabWidth:2,printWidth:100,trailingComma:"es5",sortImports:true,sortTailwindcssClasses:true},null,2));}function ze(e){return `node_modules/
dist/
.env
.env.local
.env.*.local
.DS_Store
Thumbs.db
*.log

netlify/edge-functions/api.${e}
`}async function Le(e,i,n,r){let o=p.join(process.cwd(),e),l=p.join(o,"public");h.existsSync(o)&&!n.force&&(t.error(`Directory "${e}" already exists. Use --force to overwrite.`),w(1)),n.force&&h.existsSync(o)&&(t.warn(`Removing existing directory: ${a.dim}${o}${a.reset}`),le(o)),t.info(`Creating project in ${a.cyan}${o}${a.reset}`),re(100);let c=ue(n,i),s=me(c);U(p.join(o,"src/app/api")),U(l),t.info("Scaffolding project files");let f=i.platform!=="web",g=f?i.platform:null,b=Re(e,c,i.styling,i.platform);await Promise.all([fe(l),be(o),v(p.join(o,"index.html"),`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.${s.main}"></script>
  </body>
</html>
`),je(o,s.main,c,i.styling,f),i.styling==="CSS Modules"?v(p.join(o,"src/app/page.module.css"),Ne()):Promise.resolve(),v(p.join(o,"src/app/globals.css"),Oe(i.styling)),De(o,s.api),v(p.join(o,".gitignore"),ze(s.api)),v(p.join(o,"package.json"),JSON.stringify(b,null,2)),he(o,c,s.config,i.styling,f),c?Fe(o):Promise.resolve(),_e(o)]),t.success(`Generated ${a.green}${c?"TypeScript":"JavaScript"}${a.reset} project with ${a.green}${i.styling}${a.reset} styling`);let{pm:d,failed:u}=ce(n.packageManager);u||t.info(n.packageManager?`Package manager: ${a.cyan}${d}${a.reset} (forced via --${d})`:`Package manager: ${a.cyan}${d}${a.reset}`),f&&g&&await Ce(o,g,r,d,e,i.appName,n.sign);let X=false;n.install===true?X=true:n.install===false?X=false:A()&&(X=await $({message:"Install dependencies now?",default:true}));let k=false;u||(k=await pe(o,d,X)),await v(p.join(o,"README.md"),Me(e,c,s,d,f,g)),t.plain(`
${a.green}${a.bold}OK${a.reset} ${a.bold}Project created!${a.reset} ${a.cyan}${e}${a.reset} at ${a.dim}${o}${a.reset}
`),u&&t.warn(`README uses "npm" as placeholder \u2014 update manually if needed.
`),t.success("Get started:"),t.plain(`
  ${a.green}cd ${e}${a.reset}`),!k&&!u&&t.plain(`  ${a.green}${d} install${a.reset}`),f&&g?g==="android"?(t.plain(`
${a.bold}${a.cyan}Android Commands:${a.reset}`),t.plain(`  ${a.green}${m(d,"android")}${a.reset}          # Run on Android emulator/device`),t.plain(`  ${a.green}${m(d,"android:build")}${a.reset}    # Build APK`)):g==="ios"?(t.plain(`  ${a.green}${m(d,"ios")}${a.reset}  # Run on iOS (macOS only)`),t.plain(`  ${a.green}${m(d,"ios:build")}${a.reset}  # Build iOS app`)):t.plain(`  ${a.green}${m(d,"tauri:dev")}${a.reset}  # Launches ${g} desktop app`):t.plain(`  ${a.green}${m(d,"dev")}${a.reset}`),t.plain(`
${a.green}Happy coding!${a.reset}`);}async function We(){ae();let{projectName:e,flags:i}=oe(),n=q();t.plain(ie),t.info(`Detected OS: ${n}`);let r=e;r||(A()||(t.error("Project name required in non-interactive mode."),w(1)),r=await input({message:"Project name?",default:"my-bini-app",validate:l=>l?W(l)?true:"Lowercase letters, numbers, hyphens only. Max 50 chars.":"Name required."})),W(r)||(t.error("Invalid project name. Use lowercase letters, numbers, and hyphens only. Max 50 chars."),w(1));let o=await ge(i,r);await Le(r,o,i,n);}We().catch(e=>{t.error(`Fatal: ${e instanceof Error?e.message:String(e)}`),w(1);});
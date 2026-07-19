#!/usr/bin/env node
import {input,select,password}from'@inquirer/prompts';import f from'fs';import x from'fs/promises';import d from'path';import {execSync}from'child_process';import {fileURLToPath}from'url';import {isatty}from'tty';var Y=fileURLToPath(import.meta.url),G=d.dirname(Y),Z=d.join(G,"..","package.json"),Q=JSON.parse(f.readFileSync(Z,"utf-8")),U=Q.version,ee=d.join(G,"..","assets"),n={reset:"\x1B[0m",bold:"\x1B[1m",dim:"\x1B[2m",cyan:"\x1B[36m",green:"\x1B[32m",yellow:"\x1B[33m",red:"\x1B[31m",blue:"\x1B[34m",magenta:"\x1B[35m"},te=`
${n.cyan}${n.bold}               
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
${n.reset}
${n.dim}     Developed By Binidu${n.reset}
`,_="v20.19.0",ie=/^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])$/i,ne=/^(\.|\.\.|npm|node)|[<>:"|?*\\]|[^a-z0-9\-.]/i,t={info:e=>console.log(`${n.cyan}${n.bold}INFO${n.reset} ${e}`),success:e=>console.log(`${n.green}${n.bold}OK${n.reset} ${e}`),warn:e=>console.log(`${n.yellow}${n.bold}WARN${n.reset} ${e}`),error:e=>console.error(`${n.red}${n.bold}ERROR${n.reset} ${e}`),step:e=>console.log(`${n.blue}${n.bold}STEP${n.reset} ${e}`),plain:e=>console.log(e),skip:e=>console.log(`${n.yellow}${n.bold}SKIP${n.reset} ${e}`),command:e=>console.log(`${n.magenta}${n.bold}RUN${n.reset} ${e}`)};function A(){return isatty(process.stdin.fd)&&isatty(process.stdout.fd)}function w(e=1){process.exit(e);}async function S(e){return select({message:e.message,choices:[{name:"Yes",value:true},{name:"No",value:false}],default:e.default!==false})}function L(e){let i=e.split(/[-_\s]+/).filter(Boolean);return i.length===0?"My App":i.map(r=>r.charAt(0).toUpperCase()+r.slice(1)).join(" ")}process.on("SIGINT",()=>{t.plain(`
`),t.warn("Operation cancelled."),w(0);});process.on("uncaughtException",e=>{t.error(`Uncaught exception: ${e.message}`),w(1);});process.on("unhandledRejection",e=>{t.error(`Unhandled rejection: ${e instanceof Error?e.message:String(e)}`),w(1);});function ae(){let[e=0,i=0]=process.version.slice(1).split(".").map(Number),[r=0,a=0]=_.slice(1).split(".").map(Number);(e<r||e===r&&i<a)&&(t.error(`Node.js ${_}+ required. Current: ${process.version}`),t.info("Update at https://nodejs.org"),w(1));}function re(e=100){try{if(!f.statfsSync)return;let i=f.statfsSync(process.cwd()),r=i.bavail*i.bsize/(1024*1024);r<e&&(t.error(`Insufficient disk space. Need ${e}MB, have ${Math.floor(r)}MB.`),w(1));}catch(i){i.code!=="ENOENT"&&t.warn(`Could not check disk space: ${i.message}`);}}function oe(){let e=process.argv.slice(2);(e.includes("--version")||e.includes("-v"))&&(t.plain(`${n.cyan}Bini.js CLI${n.reset} v${U}`),w(0)),(e.includes("--help")||e.includes("-h"))&&(t.plain(`
${n.bold}${n.cyan}Usage:${n.reset} create-bini-app [project-name] [options]

${n.bold}${n.cyan}Options:${n.reset}
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

${n.bold}${n.cyan}Examples:${n.reset}
  ${n.dim}create-bini-app my-app${n.reset}
  ${n.dim}create-bini-app my-app --typescript --tailwind${n.reset}
  ${n.dim}create-bini-app my-app --platform windows${n.reset}
  ${n.dim}create-bini-app my-app --platform android --app-name "My App"${n.reset}
  ${n.dim}create-bini-app my-app --platform android --nosign --pnpm${n.reset}
    `),w(0));let i=e.includes("--typescript"),r=e.includes("--javascript")||e.includes("--no-typescript"),a=e.includes("--tailwind"),o=e.includes("--css-modules"),c=e.includes("--none"),p=e.includes("--install"),s=e.includes("--no-install"),g=e.indexOf("--platform"),m=g!==-1?e[g+1]:void 0,h=e.indexOf("--app-name"),l=h!==-1?e[h+1]:void 0,u=e.includes("--sign"),X=e.includes("--nosign"),k={"--npm":"npm","--pnpm":"pnpm","--yarn":"yarn","--bun":"bun"},I=Object.keys(k).filter(C=>e.includes(C));i&&r&&(t.error("Cannot use --typescript and --javascript together."),w(1)),[a,o,c].filter(Boolean).length>1&&(t.error("Cannot use more than one of --tailwind, --css-modules, --none."),w(1)),p&&s&&(t.error("Cannot use --install and --no-install together."),w(1)),u&&X&&(t.error("Cannot use --sign and --nosign together."),w(1)),I.length>1&&(t.error(`Cannot use more than one of ${Object.keys(k).join(", ")} together.`),w(1));let J=I.length===1?k[I[0]]:void 0;return {projectName:e.find(C=>!C.startsWith("--")&&C!==m&&C!==l),flags:{force:e.includes("--force"),typescript:i?true:r?false:void 0,javascript:r,tailwind:a,cssModules:o,noStyle:c,install:p?true:s?false:void 0,platform:m,appName:l,sign:u?true:X?false:void 0,packageManager:J}}}function z(e){return !e||e.length>50||ie.test(e)?false:!ne.test(e)}function se(e){return ["web","windows","linux","macos","android","ios"].includes(e)}function q(){let e=process.platform;return e==="win32"?"windows":e==="darwin"?"macos":e==="linux"?"linux":"windows"}function H(e){try{f.mkdirSync(e,{recursive:!0,mode:488});}catch(i){throw new Error(`Cannot create directory: ${e}. ${i.message}`)}}async function y(e,i,r={}){await x.mkdir(d.dirname(e),{recursive:true,mode:488}),await x.writeFile(e,i,{mode:r.mode??416,flag:r.flag??"w"});}function le(e,i={}){let r=i.allowedBase??process.cwd();if(!e)throw new Error("Path required.");let a=d.resolve(e),o=d.resolve(r),c=d.relative(o,a);if(c===""||c.startsWith("..")||d.isAbsolute(c))throw new Error(`Refusing to delete: "${a}" is outside the allowed base "${o}".`);if([d.resolve("/"),process.env.HOME?d.resolve(process.env.HOME):null,process.env.USERPROFILE?d.resolve(process.env.USERPROFILE):null].filter(g=>g!==null).includes(a))throw new Error("Refusing to delete a system directory.");if(a.split(d.sep).filter(Boolean).length<2)throw new Error("Refusing to delete a root-level directory (safety check).");f.existsSync(a)&&f.rmSync(a,{recursive:true,force:true});}function N(e,i={}){try{let r=execSync(e,{shell:process.platform==="win32"?"cmd.exe":"/bin/sh",stdio:i.stdio??"pipe",timeout:i.timeout??12e4,cwd:i.cwd,windowsHide:!0,encoding:"utf8"});return String(r)}catch(r){throw new Error(`Command failed: ${e}
${r.message??String(r)}`)}}function R(e){try{let i=process.platform==="win32"?`where ${e}`:`which ${e}`;return N(i,{stdio:"ignore"}),!0}catch{return  false}}function D(e,i){try{execSync(e,{cwd:i,stdio:"ignore",shell:process.platform==="win32"?"cmd.exe":"/bin/sh",timeout:12e4,windowsHide:!0});}catch{}}function j(e,i){switch(e){case "npm":return `npx ${i}`;case "yarn":return `yarn ${i}`;case "pnpm":return `pnpm ${i}`;case "bun":return `bunx ${i}`}}function b(e,i){return e==="npm"?`npm run ${i}`:`${e} ${i}`}var E={bun:"bun --version",pnpm:"pnpm --version",yarn:"yarn --version",npm:"npm --version"};function de(){let i=[{name:"bun",command:E.bun,priority:4},{name:"pnpm",command:E.pnpm,priority:3},{name:"yarn",command:E.yarn,priority:2},{name:"npm",command:E.npm,priority:1}].filter(r=>{try{return N(r.command,{stdio:"ignore"}),!0}catch{return  false}});if(i.length===0)throw new Error("No package manager found. Install npm, yarn, pnpm, or bun.");return i.sort((r,a)=>a.priority-r.priority)[0].name}function ce(e){if(e)try{return N(E[e],{stdio:"ignore"}),{pm:e,failed:!1,forced:!0}}catch{t.error(`Requested package manager "${e}" was not found on PATH.`),w(1);}try{return {pm:de(),failed:!1,forced:!1}}catch(i){return t.warn(`Could not detect package manager: ${i.message}`),{pm:"npm",failed:true,forced:false}}}async function pe(e,i,r){if(!r)return  false;let a={npm:"npm install --no-audit --no-fund --loglevel=error",yarn:"yarn install --silent --no-progress",pnpm:"pnpm install --reporter=silent",bun:"bun install --silent"};t.step(`Installing dependencies with ${i}...`);try{return N(a[i],{cwd:e,stdio:"inherit",timeout:3e5}),t.success("Dependencies installed."),!0}catch{return t.warn("Auto-install failed. Run manually:"),t.plain(`    ${n.green}cd ${d.basename(e)}${n.reset}`),t.plain(`    ${n.green}${i} install${n.reset}`),false}}function ue(e,i){return e.typescript===true?true:e.javascript===true?false:i.typescript}function me(e){let i=e?"ts":"js";return {main:e?"tsx":"jsx",config:i,api:i}}async function ge(e,i){let r;e.typescript!==void 0?r=e.typescript:A()?r=await S({message:"Use TypeScript?",default:true}):r=true;let a;e.tailwind?a="Tailwind":e.cssModules?a="CSS Modules":e.noStyle?a="None":A()?a=await select({message:"Styling solution?",choices:[{name:"Tailwind CSS",value:"Tailwind"},{name:"CSS Modules",value:"CSS Modules"},{name:"None",value:"None"}],default:"Tailwind"}):a="Tailwind";let o,c=q();if(e.platform&&se(e.platform))o=e.platform;else if(A()){let s=[{name:"Web Application",value:"web"},{name:"Windows Desktop",value:"windows"},{name:"Linux Desktop",value:"linux"},{name:"macOS Desktop",value:"macos"},{name:"Android",value:"android"},{name:"iOS",value:"ios"}];console.log(`
Detected OS: ${c}`),o=await select({message:"Select target platform:",choices:s,default:"web"});}else o="web";let p=i;return o!=="web"&&(e.appName?p=e.appName:A()?p=await input({message:"App name? (used as the app name and window title)",default:L(i),validate:s=>s.trim().length>0?true:"Required."}):p=L(i)),{typescript:r,styling:a,platform:o,appName:p}}async function fe(e){let i=["favicon.ico","apple-touch-icon.png","og-image.png","logo.png"];await Promise.all(i.map(async r=>{let a=d.join(ee,r),o=d.join(e,r);try{await x.access(a),await x.copyFile(a,o);}catch{t.warn(`Asset not found, skipping: ${r}`);}}));}async function he(e){let i={name:"Bini.js App",short_name:"BiniApp",description:"Modern React application built with Bini.js",start_url:"/",display:"standalone",background_color:"#ffffff",theme_color:"#00CFFF",icons:[{src:"/favicon.ico",sizes:"64x64 32x32 24x24 16x16",type:"image/x-icon"},{src:"/apple-touch-icon.png",sizes:"180x180",type:"image/png"}]};await y(d.join(e,"public","site.webmanifest"),JSON.stringify(i,null,2));}async function be(e,i,r,a,o){let c=a==="Tailwind"?`import tailwindcss from '@tailwindcss/vite';
`:"",p=a==="Tailwind"?`
      tailwindcss(),`:"",s=i?`,
    types: ["vite/client"]`:"",g=o?`import { biniNative } from 'bini-native';
`:"",m=o?`
      biniNative(),`:"",h=["'**/dist/**'","'**/node_modules/**'"];o&&(h.push("'**/src-tauri/**'"),h.push("'**/target/**'"),h.push("'**/*.exe'"),h.push("'**/*.dll'"),h.push("'**/*.pdb'"));let l=h.join(`,
          `),u=`import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { biniroute } from 'bini-router';
import { biniOverlay } from 'bini-overlay';
import { biniEnv } from 'bini-env';
import { biniExport } from 'bini-export';
${g}${c}
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
    plugins: [${p}
      react(),
      biniroute({ platform: 'node' }),
      biniOverlay(),
      biniEnv(),
      biniExport(),${m}
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
          ${l}
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
`;await y(d.join(e,`vite.config.${r}`),u);}function we(e,i){let r={windows:`
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
----------------------------------------------------------------------`};return r[e==="ios"?"ios":e==="android"?"android":i==="windows"?"windows":i==="macos"?"macos":"linux"]||r.linux}function ve(e){let i=e.toLowerCase().replace(/[^a-z0-9]+/g,""),r=i.length>0?i:"app";return `com.bini.${/^[0-9]/.test(r)?`app${r}`:r}`}async function ye(e,i){let r=d.join(e,"tauri.conf.json");if(f.existsSync(r))try{let a=await x.readFile(r,"utf-8"),o=JSON.parse(a),c=ve(i);if(o.identifier===c){t.skip(`Bundle identifier already set to ${c}`);return}o.identifier=c,await x.writeFile(r,JSON.stringify(o,null,2)+`
`,{mode:416}),t.success(`Bundle identifier set to ${n.cyan}${c}${n.reset}`),t.info("Replace this with your own reverse-DNS identifier before publishing to an app store.");}catch(a){t.warn(`Could not set bundle identifier automatically: ${a.message}`),t.info(`Edit "identifier" in ${r} manually before building for Android/iOS/macOS.`);}}async function B(e,i,r){let a=[];if(r){for(let o of r.split(`
`))a.push(`# ${o}`);a.push("");}for(let[o,c]of Object.entries(i))a.push(`${o}=${c}`);await y(e,a.join(`
`)+`
`,{mode:384});}async function O(e,i){let r=d.join(e,".gitignore"),a="";try{a=await x.readFile(r,"utf-8");}catch{a="";}let o=new Set(a.split(`
`).map(s=>s.trim())),c=i.filter(s=>s.startsWith("#")||!o.has(s));if(c.length===0)return;let p=a.length>0&&!a.endsWith(`
`)?`
`:"";await x.appendFile(r,`${p}
${c.join(`
`)}
`,{mode:416});}async function K(e,i){let r=d.join(e,"tauri.conf.json");if(!f.existsSync(r))return t.warn(`Could not find ${r}.`),false;try{let a=await x.readFile(r,"utf-8"),o=JSON.parse(a);return i(o),await x.writeFile(r,JSON.stringify(o,null,2)+`
`,{mode:416}),!0}catch(a){return t.warn(`Could not update ${r}: ${a.message}`),false}}async function xe(e){let i=d.join(e,"app","build.gradle.kts");if(!f.existsSync(i)){t.warn(`Could not find ${i}. Wire up signingConfigs manually \u2014 see the docs.`);return}try{let r=await x.readFile(i,"utf-8");if(r.includes("keystore.properties")){t.skip("build.gradle.kts already configured for release signing.");return}r.includes("import java.io.FileInputStream")||(r=`import java.io.FileInputStream
${r}`),r.includes("import java.util.Properties")||(r=r.replace("import java.io.FileInputStream",`import java.io.FileInputStream
import java.util.Properties`));let a=`    signingConfigs {
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

`;if(!/buildTypes\s*\{/.test(r)){t.warn(`Could not find "buildTypes" block in ${i}. Add signingConfigs manually.`);return}r=r.replace(/(\n[^\S\n]*buildTypes\s*\{)/,`
${a}$1`),/getByName\("release"\)\s*\{/.test(r)?r=r.replace(/(getByName\("release"\)\s*\{)/,`$1
            signingConfig = signingConfigs.getByName("release")`):t.warn(`Could not find getByName("release") in ${i}. Set signingConfig manually.`),await x.writeFile(i,r,{mode:416}),t.success("Wired release signingConfig into build.gradle.kts");}catch(r){t.warn(`Could not patch build.gradle.kts: ${r.message}`),t.info("Configure it manually \u2014 see https://v2.tauri.app/distribute/sign/android/");}}async function Xe(e,i,r){if(t.step("Android release signing"),!(r===true?true:await S({message:"Set up Android release signing now?",default:false}))){t.info("Skipped. See: https://v2.tauri.app/distribute/sign/android/");return}let o=d.join(i,"gen","android");if(!f.existsSync(o)){t.warn("Android project not found (src-tauri/gen/android missing). Run Android init first.");return}R("keytool")||t.warn("keytool not found on PATH (ships with the JDK). Add it to PATH or use Android Studio's copy.");let c=await S({message:"Do you already have a keystore (.jks) file?",default:false}),p,s,g;if(c)p=await input({message:"Path to existing keystore file:",validate:l=>f.existsSync(l)?true:"File not found."}),s=await input({message:"Key alias:",default:"upload"}),g=await password({message:"Keystore password:",mask:"*"});else {let l=d.join(e,"keystore.jks");if(p=await input({message:"Where should the keystore be created?",default:l}),s=await input({message:"Key alias:",default:"upload"}),g=await password({message:"Set a keystore password (min 6 chars):",mask:"*"}),f.existsSync(p))t.warn(`File already exists at ${p} \u2014 leaving it untouched.`);else {t.step("Generating keystore with keytool...");let u=`CN=${d.basename(e)}, OU=Dev, O=Bini, L=Unknown, S=Unknown, C=US`,X=`keytool -genkey -v -keystore "${p}" -keyalg RSA -keysize 2048 -validity 10000 -alias "${s}" -storepass "${g}" -keypass "${g}" -dname "${u}"`;try{N(X,{stdio:"pipe",timeout:3e4}),t.success(`Keystore created at ${p}`);}catch(k){t.warn(`Could not generate keystore automatically: ${k.message}`),t.info("Generate it manually with keytool \u2014 see https://v2.tauri.app/distribute/sign/android/");return}}}let m=d.join(o,"keystore.properties"),h=process.platform==="win32"?p.replace(/\\/g,"\\\\"):p;await y(m,`password=${g}
keyAlias=${s}
storeFile=${h}
`,{mode:384}),t.success(`Wrote ${d.relative(e,m)}`),await O(e,["# Android signing (never commit)","src-tauri/gen/android/keystore.properties","*.jks","*.keystore"]),await xe(o),t.success("Android release signing configured. `pnpm android:build` will now produce a signed release.");}async function Se(e,i){if(t.step("Windows code signing"),!(i===true?true:await S({message:"Configure Windows code signing now?",default:false}))){t.info("Skipped. See: https://v2.tauri.app/distribute/sign/windows/");return}t.plain(`${n.dim}Requires a code signing certificate already imported into your Windows
certificate store (Import-PfxCertificate). See the docs if you haven't done that yet.${n.reset}`);let a=await input({message:"Certificate thumbprint (Personal > Certificates > Details in certmgr.msc):",validate:s=>s.trim().length>0?true:"Required."}),o=await select({message:"Digest algorithm:",choices:[{name:"sha256",value:"sha256"},{name:"sha1",value:"sha1"}],default:"sha256"}),c=await input({message:"Timestamp server URL:",default:"http://timestamp.comodoca.com"});await K(e,s=>{s.bundle=s.bundle??{},s.bundle.windows={...s.bundle.windows??{},certificateThumbprint:a,digestAlgorithm:o,timestampUrl:c};})&&(t.success("Windows signing configured in tauri.conf.json"),t.info("Cross-compiling from Linux/macOS requires a custom signCommand instead \u2014 see the docs."));}async function ke(e,i,r){if(t.step("macOS code signing"),!(r===true?true:await S({message:"Configure macOS code signing now?",default:false}))){t.info("Skipped. See: https://v2.tauri.app/distribute/sign/macos/");return}let o=await select({message:"Signing method:",choices:[{name:"Ad-hoc (local testing, no Apple Developer account)",value:"adhoc"},{name:"Apple Developer signing identity (Distribution / Developer ID)",value:"identity"}],default:"adhoc"}),c=o==="adhoc"?"-":await input({message:'Signing identity (from "security find-identity -v -p codesigning"):',validate:l=>l.trim().length>0?true:"Required."});if(await K(i,l=>{l.bundle=l.bundle??{},l.bundle.macOS={...l.bundle.macOS??{},signingIdentity:c};})&&t.success(`macOS signingIdentity set to "${c}" in tauri.conf.json`),o!=="identity"||!await S({message:"Set up notarization credentials too? (avoids the 'unidentified developer' warning)",default:false}))return;let g=await select({message:"Notarization method:",choices:[{name:"App Store Connect API key",value:"apiKey"},{name:"Apple ID + app-specific password",value:"appleId"}],default:"apiKey"}),m={};g==="apiKey"?(m.APPLE_API_ISSUER=await input({message:"APPLE_API_ISSUER (Issuer ID):"}),m.APPLE_API_KEY=await input({message:"APPLE_API_KEY (Key ID):"}),m.APPLE_API_KEY_PATH=await input({message:"Path to downloaded .p8 private key:",validate:l=>f.existsSync(l)?true:"File not found."})):(m.APPLE_ID=await input({message:"Apple ID email:"}),m.APPLE_PASSWORD=await password({message:"App-specific password:",mask:"*"}),m.APPLE_TEAM_ID=await input({message:"Apple Team ID:"}));let h=d.join(e,".env.signing");await B(h,m,"macOS notarization credentials \u2014 never commit this file.\nRun `source .env.signing` before `pnpm tauri:build`."),await O(e,["# Code signing secrets (never commit)",".env.signing"]),t.success(`Wrote notarization credentials to ${d.relative(e,h)}`),t.info('Run "source .env.signing" before building to notarize your app.');}async function $e(e,i){if(t.step("Linux AppImage signing"),!(i===true?true:await S({message:"Configure AppImage signing (gpg) now?",default:false}))){t.info("Skipped. See: https://v2.tauri.app/distribute/sign/linux/");return}if(!R("gpg")&&!R("gpg2")){t.warn("gpg/gpg2 not found. Install it, generate a key with `gpg2 --full-gen-key`, then re-run.");return}let a=await input({message:"GPG key ID to sign with (blank = default key):"}),c={SIGN:"1",APPIMAGETOOL_SIGN_PASSPHRASE:await password({message:"GPG key passphrase:",mask:"*"})};a.trim()&&(c.SIGN_KEY=a.trim());let p=d.join(e,".env.signing");await B(p,c,"AppImage signing secrets \u2014 never commit this file.\nRun `source .env.signing` before `pnpm tauri:build`."),await O(e,["# Code signing secrets (never commit)",".env.signing"]),t.success(`Wrote AppImage signing config to ${d.relative(e,p)}`),t.info('Run "source .env.signing" before building to sign the AppImage.');}async function Ae(e,i){if(t.step("iOS code signing"),!(i===true?true:await S({message:"Configure iOS code signing now?",default:false}))){t.info("Skipped. Xcode-managed automatic signing is used by default.");return}if(await select({message:"Signing method:",choices:[{name:"Automatic (Xcode-managed, recommended for local builds)",value:"automatic"},{name:"Manual (certificate + provisioning profile, for CI)",value:"manual"}],default:"automatic"})==="automatic"){t.info("Nothing to configure locally \u2014 sign in with your Apple ID in Xcode (Settings > Accounts).");return}let o=await input({message:"Path to exported certificate (.p12):",validate:s=>f.existsSync(s)?true:"File not found."}),c=await password({message:"Certificate export password:",mask:"*"}),p=await input({message:"Path to provisioning profile (.mobileprovision):",validate:s=>f.existsSync(s)?true:"File not found."});try{let s=(await x.readFile(o)).toString("base64"),g=(await x.readFile(p)).toString("base64"),m=d.join(e,".env.signing");await B(m,{IOS_CERTIFICATE:s,IOS_CERTIFICATE_PASSWORD:c,IOS_MOBILE_PROVISION:g},"iOS manual signing secrets \u2014 never commit this file.\nRun `source .env.signing` before `pnpm tauri ios build`."),await O(e,["# Code signing secrets (never commit)",".env.signing"]),t.success(`Wrote iOS signing credentials to ${d.relative(e,m)}`),t.info('Run "source .env.signing" before building to sign your iOS app.');}catch(s){t.warn(`Could not read/encode certificate or profile: ${s.message}`);}}async function Pe(e,i,r,a){if(a===false){t.info("Skipping code signing setup (--nosign). See https://v2.tauri.app/distribute/sign/");return}if(!A()){t.info("Skipping code signing setup (non-interactive). See https://v2.tauri.app/distribute/sign/");return}switch(r){case "android":await Xe(e,i,a);break;case "windows":await Se(i,a);break;case "macos":await ke(e,i,a);break;case "linux":await $e(e,a);break;case "ios":await Ae(e,a);break}}async function Ce(e,i,r,a,o,c,p){t.step(`Setting up Tauri for ${i} on ${r}`),t.step("Installing Tauri dependencies...");let s=[{type:"dev",packages:["@tauri-apps/cli@latest","cross-env@latest","bini-native@latest"]},{type:"prod",packages:["@tauri-apps/api@latest"]}];for(let l of s){let u=l.type==="dev"?`${a} add -D ${l.packages.join(" ")}`:`${a} add ${l.packages.join(" ")}`;try{D(u,e);}catch{}}t.success("Tauri dependencies installed");let g=d.join(e,"src-tauri");if(f.existsSync(g))t.skip("Tauri already initialized");else {t.step("Initializing Tauri with auto-filled values...");let l=`npx @tauri-apps/cli init       --app-name "${c}"       --window-title "${c}"       --frontend-dist "../dist"       --dev-url "http://localhost:3000"       --before-dev-command "${b(a,"dev")}"       --before-build-command "${b(a,"build")}"       --force`;t.command(l);try{execSync(l,{cwd:e,stdio:"inherit",timeout:6e4,shell:process.platform==="win32"?"cmd.exe":"/bin/sh",env:{...process.env,FORCE_COLOR:"true"}}),t.success("Tauri initialized with auto-filled values");}catch{t.warn("Tauri init failed. Please run manually:"),t.plain(`  ${n.yellow}${l}${n.reset}`);return}}await ye(g,o);let m=d.join(g,"icons");if(f.existsSync(m)){t.step("Removing existing Tauri icons...");try{f.rmSync(m,{recursive:!0,force:!0}),t.success("Existing icons removed");}catch(l){t.warn(`Could not remove icons: ${l instanceof Error?l.message:String(l)}`);}}t.step("Generating Tauri icons from public/logo.png...");let h=j(a,"tauri icon public/logo.png");t.command(h);try{execSync(h,{cwd:e,stdio:"inherit",timeout:6e4,shell:process.platform==="win32"?"cmd.exe":"/bin/sh"}),t.success("Tauri icons generated from logo.png");}catch{t.warn("Could not generate icons automatically."),t.info(`Run: ${n.cyan}${h}${n.reset}`);}if(i==="android"){let l=d.join(e,"src-tauri","gen","android");if(f.existsSync(l))t.skip("Android support already initialized");else {t.step("Initializing Android support...");let u=j(a,"tauri android init");t.command(u);try{execSync(u,{cwd:e,stdio:"inherit",timeout:12e4,shell:process.platform==="win32"?"cmd.exe":"/bin/sh"}),t.success("Android support initialized");}catch{t.warn("Android init failed. Please run manually:"),t.plain(`  ${n.yellow}${u}${n.reset}`);}}}if(i==="ios"){let l=d.join(e,"src-tauri","gen","ios");if(f.existsSync(l))t.skip("iOS support already initialized");else {t.step("Initializing iOS support...");let u=j(a,"tauri ios init");if(t.command(u),r==="macos")try{execSync(u,{cwd:e,stdio:"inherit",timeout:12e4,shell:process.platform==="win32"?"cmd.exe":"/bin/sh"}),t.success("iOS support initialized");}catch{t.warn(`iOS init failed. Please run manually: ${u}`);}else t.warn("iOS initialization skipped (requires macOS)");}}if(await Pe(e,g,i,p),t.step("Setup Instructions"),t.plain(we(i,r)),t.step("Checking prerequisites..."),i==="android"){R("java")||t.warn("Java JDK 17 not found (required for Android)"),process.env.ANDROID_HOME||t.warn("ANDROID_HOME not set (required for Android)"),t.step("Adding Rust Android targets");let l=["aarch64-linux-android","armv7-linux-androideabi","i686-linux-android","x86_64-linux-android"];for(let u of l){t.command(`rustup target add ${u}`);try{execSync(`rustup target list | grep ${u}`,{stdio:"pipe",shell:process.platform==="win32"?"cmd.exe":"/bin/sh"}).toString().includes("installed")||D(`rustup target add ${u}`,e);}catch{D(`rustup target add ${u}`,e);}}t.success("Rust Android targets ready");}if(i==="ios"&&r!=="macos"&&t.warn("iOS development requires macOS with Xcode"),r==="windows"&&i==="windows"&&!R("cl")&&t.warn("Visual Studio Build Tools not found (required for Windows)"),t.success(`Tauri setup complete for ${i}`),t.step("Available Commands"),i==="android"){let l=b(a,"android"),u=b(a,"android:build");t.plain(`
  ${n.green}${n.bold}Run on Android:${n.reset} ${n.cyan}${l}${n.reset}`),t.plain(`  ${n.green}${n.bold}Build APK:${n.reset} ${n.cyan}${u}${n.reset}`),t.plain(`  ${n.green}${n.bold}Manual Command:${n.reset} ${n.dim}npx @tauri-apps/cli android dev${n.reset}
`),t.plain(`  ${n.yellow}${n.bold}Quick Start Guide:${n.reset}`),t.plain("  1. Start an Android emulator or connect a device with USB debugging"),t.plain(`  2. Run: ${n.green}${l}${n.reset}`),t.plain(`  3. Build APK: ${n.green}${u}${n.reset}
`);}else {let u={windows:{dev:b(a,"tauri:dev"),build:b(a,"tauri:build")},linux:{dev:b(a,"tauri:dev"),build:b(a,"tauri:build")},macos:{dev:b(a,"tauri:dev"),build:b(a,"tauri:build")},android:{dev:b(a,"android"),build:b(a,"android:build")},ios:{dev:b(a,"ios"),build:b(a,"ios:build")}}[i];t.plain(`
  ${n.green}${n.bold}Development:${n.reset} ${u.dev}`),t.plain(`  ${n.green}${n.bold}Build:${n.reset} ${u.build}
`);}}function Ee(){return `* { box-sizing: border-box; }
html { font-family: system-ui, -apple-system, 'Segoe UI', sans-serif; -webkit-font-smoothing: antialiased; }
body { line-height: 1.5; min-height: 100vh; margin: 0; }
#root { min-height: 100vh; }
`}function Te(){return `.root { 
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #ffffff; 
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem 1rem;
  gap: 1rem;
  width: fit-content;
  height: fit-content;
}

@media (min-width: 640px) {
  .content { padding: 3rem 2rem; gap: 1.5rem; }
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
  width: 100%;
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
`}function Re(){return `.root { 
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #ffffff; 
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem 1rem;
  gap: 1rem;
  width: fit-content;
  height: fit-content;
}

@media (min-width: 640px) {
  .content { padding: 3rem 2rem; gap: 1.5rem; }
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
  width: 100%;
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
`}function Ne(e){let i=Ee();return e==="Tailwind"?`@import "tailwindcss";

${i}`:e==="CSS Modules"?i:i+`
`+Te()}function Oe(e,i,r,a){let o=a!=="web",c={react:"latest","react-dom":"latest","react-router-dom":"latest",hono:"latest","bini-router":"latest","bini-overlay":"latest","bini-server":"latest"},p={"@vitejs/plugin-react":"latest",vite:"latest",oxlint:"latest",oxfmt:"latest","bini-env":"latest","bini-export":"latest"};o&&(p["@tauri-apps/cli"]="latest",p["cross-env"]="latest",p["bini-native"]="latest",c["@tauri-apps/api"]="latest"),i&&Object.assign(p,{"@types/react":"latest","@types/react-dom":"latest","@types/node":"latest",typescript:"latest"}),r==="Tailwind"&&Object.assign(p,{tailwindcss:"latest","@tailwindcss/vite":"latest"});let s={dev:o?"vite":"vite --host --open",build:i?"tsc --noEmit && vite build":"vite build",export:"vite build --mode export",start:"bini-server",preview:"vite preview --host --open","type-check":i?"tsc --noEmit":"echo 'TypeScript not enabled'",lint:"oxlint src",format:"oxfmt src",check:i?"oxlint src && oxfmt src && tsc --noEmit":"oxlint src && oxfmt src"};return o&&(s.predev="npx @tauri-apps/cli icon public/logo.png",s.prebuild="npx @tauri-apps/cli icon public/logo.png",s["tauri:dev"]="cross-env TAURI=true tauri dev",s["tauri:build"]="cross-env TAURI=true tauri build",s["tauri:icon"]="npx @tauri-apps/cli icon public/logo.png",s.android="npx @tauri-apps/cli android dev",s["android:dev"]="npx @tauri-apps/cli android dev",s["android:build"]="npx @tauri-apps/cli android build",s.ios="npx @tauri-apps/cli ios dev",s["ios:dev"]="npx @tauri-apps/cli ios dev",s["ios:build"]="npx @tauri-apps/cli ios build"),a==="ios"&&(s.tauri="npx @tauri-apps/cli"),{name:e,type:"module",version:"1.0.0",scripts:s,dependencies:c,devDependencies:p}}var M=`[
  { label: 'Docs',     desc: 'Read the documentation',   href: 'https://bini.js.org'                           },
  { label: 'Examples', desc: 'Browse starter templates', href: 'https://github.com/Binidu01/bini-examples'     },
  { label: 'npm',      desc: 'View on npm registry',     href: 'https://www.npmjs.com/package/create-bini-app' },
  { label: 'GitHub',   desc: 'Star us on GitHub',        href: 'https://github.com/Binidu01'                   },
]`,F="['Web', 'Windows', 'macOS', 'Linux', 'Android', 'iOS']";function Ie(e,i){let r=e==="tsx";return i==="Tailwind"?`import React, { useEffect, useRef, useState } from 'react';

const links = ${M};
const platforms = ${F};

${r?`interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

`:""}const GradientText = ${r?"({ children, className = '' }: GradientTextProps)":"({ children, className = '' })"} => {
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const fitContent = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const content = container.firstElementChild as HTMLElement;
      if (!content) return;
      
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      const contentWidth = content.scrollWidth;
      const contentHeight = content.scrollHeight;
      
      const scaleX = viewportWidth / contentWidth;
      const scaleY = viewportHeight / contentHeight;
      const newScale = Math.min(scaleX, scaleY, 1);
      
      setScale(newScale);
    };

    fitContent();
    window.addEventListener('resize', fitContent);
    
    const timeout = setTimeout(fitContent, 100);
    
    return () => {
      window.removeEventListener('resize', fitContent);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-screen h-screen overflow-hidden bg-white dark:bg-black flex items-center justify-center"
    >
      <div
        style={{
          transform: \`scale(\${scale})\`,
          transformOrigin: 'center center',
          width: 'fit-content',
          height: 'fit-content',
          maxWidth: '100vw',
          maxHeight: '100vh',
        }}
      >
        <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-8 py-8 sm:py-12 gap-4 sm:gap-6">
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
          
          <section className="px-4 sm:px-8 pb-8 sm:pb-12 w-full">
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
      </div>
    </div>
  );
}
`:i==="CSS Modules"?`import React, { useEffect, useRef, useState } from 'react';
import styles from './page.module.css';

const links = ${M};
const platforms = ${F};

${r?`interface GradientTextProps {
  children: React.ReactNode;
}

`:""}const GradientText = ${r?"({ children }: GradientTextProps)":"({ children })"} => {
  return (
    <span className={styles.gradientTextWrap}>
      <span className={styles.gradientText}>{children}</span>
      <span className={styles.gradientTextFallback} aria-hidden="true">{children}</span>
    </span>
  );
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const fitContent = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const content = container.firstElementChild as HTMLElement;
      if (!content) return;
      
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      const contentWidth = content.scrollWidth;
      const contentHeight = content.scrollHeight;
      
      const scaleX = viewportWidth / contentWidth;
      const scaleY = viewportHeight / contentHeight;
      const newScale = Math.min(scaleX, scaleY, 1);
      
      setScale(newScale);
    };

    fitContent();
    window.addEventListener('resize', fitContent);
    
    const timeout = setTimeout(fitContent, 100);
    
    return () => {
      window.removeEventListener('resize', fitContent);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={styles.root}
    >
      <div
        style={{
          transform: \`scale(\${scale})\`,
          transformOrigin: 'center center',
          width: 'fit-content',
          height: 'fit-content',
          maxWidth: '100vw',
          maxHeight: '100vh',
        }}
      >
        <div className={styles.content}>
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
      </div>
    </div>
  );
}
`:`import React, { useEffect, useRef, useState } from 'react';
import './globals.css';

const links = ${M};
const platforms = ${F};

${r?`interface GradientTextProps {
  children: React.ReactNode;
}

`:""}const GradientText = ${r?"({ children }: GradientTextProps)":"({ children })"} => {
  return (
    <span className="gradient-text-wrap">
      <span className="gradient-text">{children}</span>
      <span className="gradient-text-fallback" aria-hidden="true">{children}</span>
    </span>
  );
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const fitContent = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const content = container.firstElementChild as HTMLElement;
      if (!content) return;
      
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      const contentWidth = content.scrollWidth;
      const contentHeight = content.scrollHeight;
      
      const scaleX = viewportWidth / contentWidth;
      const scaleY = viewportHeight / contentHeight;
      const newScale = Math.min(scaleX, scaleY, 1);
      
      setScale(newScale);
    };

    fitContent();
    window.addEventListener('resize', fitContent);
    
    const timeout = setTimeout(fitContent, 100);
    
    return () => {
      window.removeEventListener('resize', fitContent);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="root"
    >
      <div
        style={{
          transform: \`scale(\${scale})\`,
          transformOrigin: 'center center',
          width: 'fit-content',
          height: 'fit-content',
          maxWidth: '100vw',
          maxHeight: '100vh',
        }}
      >
        <div className="content">
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
      </div>
    </div>
  );
}
`}async function De(e,i,r,a,o){let c=d.join(e,"src/app"),p=r?"{ children }: { children: React.ReactNode }":"{ children }",s=`import React from 'react';
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
  const modules = import.meta.glob('./app/api/*.{ts,tsx,js,jsx}', { eager: true })${r?" as Record<string, { default: Hono }>":""};

  for (const mod of Object.values(modules)) {
    apiApp.route('/api', ${r?"(mod as { default: Hono }).default":"mod.default"});
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
    const anchor = (e.target${r?" as HTMLElement":""}).closest('a');
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
`;await Promise.all([y(d.join(e,"src",`main.${i}`),s),y(d.join(c,`layout.${i}`),`import React from 'react';
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

export default function RootLayout(${p}) {
  return <React.Fragment>{children}</React.Fragment>;
}
`),y(d.join(c,`page.${i}`),Ie(i,a))]);}async function je(e,i){await y(d.join(e,`src/app/api/hello.${i}`),`import { Hono } from 'hono'

const app = new Hono()

app.all('/hello', (c) => {
  return c.json({
    message  : 'Hello from Bini.js!',
    timestamp: new Date().toISOString(),
    method   : c.req.method,
  })
})

export default app
`);}function Me(e,i,r,a,o,c){return `# ${e}

A **Bini.js** application \u2014 build full-stack React applications for **web, desktop, and mobile** using a single unified development experience.

Powered by **Bini.js**, **Vite**, **Hono**, and **Tauri**.

---

# Web

## Features

- File-based routing, nested layouts, per-route metadata, and automatic code splitting powered by **bini-router**.
- API routes powered by **Hono**:
  - Plain function handlers
  - Full Hono applications
  - Located inside \`src/app/api/\`
- API execution through:
  - Vite development middleware
  - bini-server in production
  - Edge runtimes when deployed
- Zero-dependency production server (**bini-server**) with:
  - ETag support
  - 304 responses
  - Graceful shutdown
  - Automatic port fallback
- Static SPA export (**bini-export**):
  - Pre-renders static routes
  - Generates optimized \`404.html\`
  - Compatible with static hosting platforms
- Deploy anywhere:
  - Netlify Edge Functions
  - Vercel Edge Runtime
  - Cloudflare Workers
  - Node.js
  - Deno
- Development overlay with:
  - Shiki-powered error highlighting
  - Automatic import support
  - GitHub Codespaces compatibility

## Commands

| Command | Description |
|---|---|
| \`${a} run dev\` | Start the Vite development server with HMR |
| \`${a} run build\` | Type-check and build the production application |
| \`${a} start\` | Serve production output using bini-server |
| \`${a} run export\` | Export the application as a static SPA |
| \`${a} run preview\` | Preview the production build |

\`start\` and \`export\` are available only for web-target projects.

Desktop and mobile targets ship as native applications instead.

## Requirements

- Node.js >= 20.19.0

No native SDKs, platform toolchains, or signing setup required.

---

# Windows Desktop

## Features

- Builds a native Windows desktop application using **Tauri** and **WebView2**.
- Small application size without bundling a complete browser engine.
- Native APIs automatically configured through **bini-native**:
  - Filesystem
  - Clipboard
  - Notifications
  - Dialogs
  - OS information
- External URLs automatically open in the user's default browser.
- Supports Windows application signing through Authenticode.

## Commands

| Command | Description |
|---|---|
| \`${a} run tauri:dev\` | Start the application in development mode |
| \`${a} run tauri:build\` | Build a distributable Windows application |
| \`${a} run tauri:icon\` | Generate application icons from \`public/logo.png\` |

## Requirements

- Microsoft C++ Build Tools

Install:

\`\`\`
Desktop development with C++
\`\`\`

- Microsoft Edge WebView2 Runtime

Verify installation:

\`\`\`bash
cl
\`\`\`

---

# macOS Desktop

## Features

- Builds a native macOS application using **Tauri** and **WKWebView**.
- Native API integration automatically configured by **bini-native**.
- Supports:
  - Filesystem access
  - Clipboard access
  - Notifications
  - Dialogs
- External URLs open in the user's default browser.
- Supports:
  - Ad-hoc signing for local testing
  - Developer ID signing
  - Application notarization

## Commands

| Command | Description |
|---|---|
| \`${a} run tauri:dev\` | Start the application in development mode |
| \`${a} run tauri:build\` | Build a distributable macOS application |
| \`${a} run tauri:icon\` | Generate application icons from \`public/logo.png\` |

## Requirements

- macOS
- Xcode Command Line Tools

\`\`\`bash
xcode-select --install
\`\`\`

- Homebrew

- Tauri dependencies:

\`\`\`bash
brew install gtk+3 webkit2gtk pkg-config
\`\`\`

- Xcode (required for iOS development)

---

# Linux Desktop

## Features

- Builds native Linux applications using **Tauri** and **WebKitGTK**.
- Automatic native API integration through **bini-native**.
- Supports:
  - Filesystem
  - Clipboard
  - Notifications
  - Dialogs
- External links open using the system browser.
- Supports AppImage distribution.

## Commands

| Command | Description |
|---|---|
| \`${a} run tauri:dev\` | Start the application in development mode |
| \`${a} run tauri:build\` | Build Linux binaries/AppImage |
| \`${a} run tauri:icon\` | Generate application icons from \`public/logo.png\` |

## Requirements

### Debian / Ubuntu

\`\`\`bash
sudo apt update

sudo apt install -y \\
libwebkit2gtk-4.0-dev \\
build-essential \\
libssl-dev \\
libgtk-3-dev \\
libayatana-appindicator3-dev \\
librsvg2-dev \\
libxdo-dev \\
pkg-config
\`\`\`

### Fedora

\`\`\`bash
sudo dnf groupinstall "C Development Tools and Libraries"

sudo dnf install \\
webkit2gtk4.0-devel \\
openssl-devel \\
gtk3-devel \\
libappindicator-gtk3-devel \\
librsvg2-devel \\
libxdo-devel \\
pkg-config
\`\`\`

### Arch

\`\`\`bash
sudo pacman -S \\
webkit2gtk \\
base-devel \\
openssl \\
gtk3 \\
libappindicator-gtk3 \\
librsvg \\
libxdo \\
pkg-config
\`\`\`

---

# Android

## Features

- Builds a real native Android application using Tauri's Android backend.
- Not a browser wrapper.
- Native capabilities automatically wired by **bini-native**:
  - Camera
  - Filesystem
  - Notifications
  - Geolocation
  - Device APIs
- Android configuration available through:

\`\`\`
src-tauri/gen/android
\`\`\`

- Supports release signing with:
  - Android keystore
  - keystore.properties

## Commands

| Command | Description |
|---|---|
| \`${a} run android\` | Run on a connected Android emulator or device |
| \`${a} run android:build\` | Build a release APK/AAB |
| \`${a} run tauri -- android dev\` | Manual equivalent of \`${a} run android\` |
| \`${a} run tauri -- android build\` | Manual equivalent of \`${a} run android:build\` |

## Requirements

- Java JDK 17
- Android Studio
- Android SDK
- Android Build Tools
- Android NDK

Environment variables:

\`\`\`
JAVA_HOME
ANDROID_HOME
\`\`\`

Rust targets:

\`\`\`bash
rustup target add aarch64-linux-android
rustup target add armv7-linux-androideabi
rustup target add i686-linux-android
rustup target add x86_64-linux-android
\`\`\`

---

# iOS

## Features

- Builds a native iOS application using Tauri's iOS backend.
- Uses Apple's WKWebView runtime.
- Native plugin integration automatically managed by **bini-native**.
- Supports:
  - Automatic Xcode signing
  - Manual certificates
  - CI signing workflows

iOS builds require macOS.

Windows and Linux cannot generate iOS applications.

## Commands

| Command | Description |
|---|---|
| \`${a} run ios\` | Run on the iOS Simulator or a connected device |
| \`${a} run ios:build\` | Build the iOS application |
| \`${a} run tauri -- ios dev\` | Manual equivalent of \`${a} run ios\` |
| \`${a} run tauri -- ios build\` | Manual equivalent of \`${a} run ios:build\` |

## Requirements

(macOS only)

- Xcode
- Xcode Command Line Tools

\`\`\`bash
xcode-select --install
\`\`\`

- CocoaPods

\`\`\`bash
sudo gem install cocoapods
\`\`\`

Rust targets:

\`\`\`bash
rustup target add aarch64-apple-ios
rustup target add x86_64-apple-ios
rustup target add aarch64-apple-ios-sim
\`\`\`

---

# Native Integration

## bini-native

bini-native automatically manages Tauri native configuration during development and builds.

Handled automatically:

- Tauri plugin registration
- Rust dependencies
- Capability permissions
- Android configuration
- iOS configuration
- macOS configuration

No manual native wiring required.

---

# Code Signing

Signing configuration is stored in git-ignored files.

Desktop signing:

\`\`\`
.env.signing
\`\`\`

Supported platforms:

- Windows
- macOS
- Linux

Android signing:

\`\`\`
src-tauri/gen/android/keystore.properties
\`\`\`

---

# Built With

The Bini.js ecosystem:

- **Vite** \u2014 modern build pipeline with Rolldown-powered builds
- **Hono** \u2014 lightweight API framework
- **bini-router** \u2014 filesystem routing and API middleware
- **bini-export** \u2014 static SPA export
- **bini-server** \u2014 zero-dependency production server
- **bini-native** \u2014 automatic Tauri integration
- **bini-env** \u2014 environment configuration
- **bini-overlay** \u2014 development tooling
- **Oxlint** \u2014 fast Rust-based linting
- **Oxfmt** \u2014 Prettier-compatible formatter
${i?`
- **TypeScript** \u2014 static type safety`:""}

---

# Documentation

https://bini.js.org

---

Built with **Bini.js v${U}**`}async function Fe(e){await y(d.join(e,"tsconfig.json"),JSON.stringify({compilerOptions:{target:"ES2022",lib:["ES2022","DOM","DOM.Iterable"],module:"ESNext",skipLibCheck:true,moduleResolution:"bundler",allowImportingTsExtensions:true,allowArbitraryExtensions:true,resolveJsonModule:true,isolatedModules:true,noEmit:true,jsx:"react-jsx",strict:true,paths:{"@/*":["./src/*"]},forceConsistentCasingInFileNames:true,types:["vite/client"]},include:["src"],exclude:["node_modules","dist"]},null,2));}async function Be(e){await y(d.join(e,".oxlintrc.json"),JSON.stringify({$schema:"./node_modules/oxlint/configuration_schema.json",plugins:["react"],env:{browser:true,es2022:true},ignorePatterns:["dist","node_modules"]},null,2)),await y(d.join(e,".oxfmtrc.json"),JSON.stringify({semi:false,singleQuote:true,tabWidth:2,printWidth:100,trailingComma:"es5",sortImports:true,sortTailwindcssClasses:true},null,2));}function We(e){return `node_modules/
dist/
.env
.env.local
.env.*.local
.DS_Store
Thumbs.db
*.log

netlify/edge-functions/api.${e}
`}async function _e(e,i,r,a){let o=d.join(process.cwd(),e),c=d.join(o,"public");f.existsSync(o)&&!r.force&&(t.error(`Directory "${e}" already exists. Use --force to overwrite.`),w(1)),r.force&&f.existsSync(o)&&(t.warn(`Removing existing directory: ${n.dim}${o}${n.reset}`),le(o)),t.info(`Creating project in ${n.cyan}${o}${n.reset}`),re(100);let p=ue(r,i),s=me(p);H(d.join(o,"src/app/api")),H(c),t.info("Scaffolding project files");let g=i.platform!=="web",m=g?i.platform:null,h=Oe(e,p,i.styling,i.platform);await Promise.all([fe(c),he(o),y(d.join(o,"index.html"),`<!DOCTYPE html>
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
`),De(o,s.main,p,i.styling,g),i.styling==="CSS Modules"?y(d.join(o,"src/app/page.module.css"),Re()):Promise.resolve(),y(d.join(o,"src/app/globals.css"),Ne(i.styling)),je(o,s.api),y(d.join(o,".gitignore"),We(s.api)),y(d.join(o,"package.json"),JSON.stringify(h,null,2)),be(o,p,s.config,i.styling,g),p?Fe(o):Promise.resolve(),Be(o)]),t.success(`Generated ${n.green}${p?"TypeScript":"JavaScript"}${n.reset} project with ${n.green}${i.styling}${n.reset} styling`);let{pm:l,failed:u}=ce(r.packageManager);u||t.info(r.packageManager?`Package manager: ${n.cyan}${l}${n.reset} (forced via --${l})`:`Package manager: ${n.cyan}${l}${n.reset}`),g&&m&&await Ce(o,m,a,l,e,i.appName,r.sign);let X=false;r.install===true?X=true:r.install===false?X=false:A()&&(X=await S({message:"Install dependencies now?",default:true}));let k=false;u||(k=await pe(o,l,X)),await y(d.join(o,"README.md"),Me(e,p,s,l)),t.plain(`
${n.green}${n.bold}OK${n.reset} ${n.bold}Project created!${n.reset} ${n.cyan}${e}${n.reset} at ${n.dim}${o}${n.reset}
`),u&&t.warn(`README uses "npm" as placeholder \u2014 update manually if needed.
`),t.success("Get started:"),t.plain(`
  ${n.green}cd ${e}${n.reset}`),!k&&!u&&t.plain(`  ${n.green}${l} install${n.reset}`),g&&m?m==="android"?(t.plain(`
${n.bold}${n.cyan}Android Commands:${n.reset}`),t.plain(`  ${n.green}${b(l,"android")}${n.reset}          # Run on Android emulator/device`),t.plain(`  ${n.green}${b(l,"android:build")}${n.reset}    # Build APK`)):m==="ios"?(t.plain(`  ${n.green}${b(l,"ios")}${n.reset}  # Run on iOS (macOS only)`),t.plain(`  ${n.green}${b(l,"ios:build")}${n.reset}  # Build iOS app`)):t.plain(`  ${n.green}${b(l,"tauri:dev")}${n.reset}  # Launches ${m} desktop app`):t.plain(`  ${n.green}${b(l,"dev")}${n.reset}`),t.plain(`
${n.green}Happy coding!${n.reset}`);}async function Le(){ae();let{projectName:e,flags:i}=oe(),r=q();t.plain(te),t.info(`Detected OS: ${r}`);let a=e;a||(A()||(t.error("Project name required in non-interactive mode."),w(1)),a=await input({message:"Project name?",default:"my-bini-app",validate:c=>c?z(c)?true:"Lowercase letters, numbers, hyphens only. Max 50 chars.":"Name required."})),z(a)||(t.error("Invalid project name. Use lowercase letters, numbers, and hyphens only. Max 50 chars."),w(1));let o=await ge(i,a);await _e(a,o,i,r);}Le().catch(e=>{t.error(`Fatal: ${e instanceof Error?e.message:String(e)}`),w(1);});
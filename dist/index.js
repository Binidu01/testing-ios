#!/usr/bin/env node
import {input,select,password}from'@inquirer/prompts';import f from'fs';import y from'fs/promises';import l from'path';import {execSync}from'child_process';import {fileURLToPath}from'url';import {isatty}from'tty';var Y=fileURLToPath(import.meta.url),G=l.dirname(Y),Z=l.join(G,"..","package.json"),Q=JSON.parse(f.readFileSync(Z,"utf-8")),H=Q.version,ee=l.join(G,"..","assets"),n={reset:"\x1B[0m",bold:"\x1B[1m",dim:"\x1B[2m",cyan:"\x1B[36m",green:"\x1B[32m",yellow:"\x1B[33m",red:"\x1B[31m",blue:"\x1B[34m",magenta:"\x1B[35m"},ie=`
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
${n.dim}        Developed By Binidu${n.reset}
`,_="v20.19.0",te=/^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])$/i,ne=/^(\.|\.\.|npm|node)|[<>:"|?*\\]|[^a-z0-9\-.]/i,i={info:e=>console.log(`${n.cyan}${n.bold}INFO${n.reset} ${e}`),success:e=>console.log(`${n.green}${n.bold}OK${n.reset} ${e}`),warn:e=>console.log(`${n.yellow}${n.bold}WARN${n.reset} ${e}`),error:e=>console.error(`${n.red}${n.bold}ERROR${n.reset} ${e}`),step:e=>console.log(`${n.blue}${n.bold}STEP${n.reset} ${e}`),plain:e=>console.log(e),skip:e=>console.log(`${n.yellow}${n.bold}SKIP${n.reset} ${e}`),command:e=>console.log(`${n.magenta}${n.bold}RUN${n.reset} ${e}`)};function A(){return isatty(process.stdin.fd)&&isatty(process.stdout.fd)}function w(e=1){process.exit(e);}async function X(e){return select({message:e.message,choices:[{name:"Yes",value:true},{name:"No",value:false}],default:e.default!==false})}function L(e){let t=e.split(/[-_\s]+/).filter(Boolean);return t.length===0?"My App":t.map(r=>r.charAt(0).toUpperCase()+r.slice(1)).join(" ")}process.on("SIGINT",()=>{i.plain(`
`),i.warn("Operation cancelled."),w(0);});process.on("uncaughtException",e=>{i.error(`Uncaught exception: ${e.message}`),w(1);});process.on("unhandledRejection",e=>{i.error(`Unhandled rejection: ${e instanceof Error?e.message:String(e)}`),w(1);});function ae(){let[e=0,t=0]=process.version.slice(1).split(".").map(Number),[r=0,a=0]=_.slice(1).split(".").map(Number);(e<r||e===r&&t<a)&&(i.error(`Node.js ${_}+ required. Current: ${process.version}`),i.info("Update at https://nodejs.org"),w(1));}function re(e=100){try{if(!f.statfsSync)return;let t=f.statfsSync(process.cwd()),r=t.bavail*t.bsize/(1024*1024);r<e&&(i.error(`Insufficient disk space. Need ${e}MB, have ${Math.floor(r)}MB.`),w(1));}catch(t){t.code!=="ENOENT"&&i.warn(`Could not check disk space: ${t.message}`);}}function oe(){let e=process.argv.slice(2);(e.includes("--version")||e.includes("-v"))&&(i.plain(`${n.cyan}Bini.js CLI${n.reset} v${H}`),w(0)),(e.includes("--help")||e.includes("-h"))&&(i.plain(`
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
    `),w(0));let t=e.includes("--typescript"),r=e.includes("--javascript")||e.includes("--no-typescript"),a=e.includes("--tailwind"),o=e.includes("--css-modules"),c=e.includes("--none"),p=e.includes("--install"),s=e.includes("--no-install"),g=e.indexOf("--platform"),u=g!==-1?e[g+1]:void 0,h=e.indexOf("--app-name"),d=h!==-1?e[h+1]:void 0,m=e.includes("--sign"),k=e.includes("--nosign"),S={"--npm":"npm","--pnpm":"pnpm","--yarn":"yarn","--bun":"bun"},I=Object.keys(S).filter(C=>e.includes(C));t&&r&&(i.error("Cannot use --typescript and --javascript together."),w(1)),[a,o,c].filter(Boolean).length>1&&(i.error("Cannot use more than one of --tailwind, --css-modules, --none."),w(1)),p&&s&&(i.error("Cannot use --install and --no-install together."),w(1)),m&&k&&(i.error("Cannot use --sign and --nosign together."),w(1)),I.length>1&&(i.error(`Cannot use more than one of ${Object.keys(S).join(", ")} together.`),w(1));let J=I.length===1?S[I[0]]:void 0;return {projectName:e.find(C=>!C.startsWith("--")&&C!==u&&C!==d),flags:{force:e.includes("--force"),typescript:t?true:r?false:void 0,javascript:r,tailwind:a,cssModules:o,noStyle:c,install:p?true:s?false:void 0,platform:u,appName:d,sign:m?true:k?false:void 0,packageManager:J}}}function W(e){return !e||e.length>50||te.test(e)?false:!ne.test(e)}function se(e){return ["web","windows","linux","macos","android","ios"].includes(e)}function q(){let e=process.platform;return e==="win32"?"windows":e==="darwin"?"macos":e==="linux"?"linux":"windows"}function U(e){try{f.mkdirSync(e,{recursive:!0,mode:488});}catch(t){throw new Error(`Cannot create directory: ${e}. ${t.message}`)}}async function x(e,t,r={}){await y.mkdir(l.dirname(e),{recursive:true,mode:488}),await y.writeFile(e,t,{mode:r.mode??416,flag:r.flag??"w"});}function de(e,t={}){let r=t.allowedBase??process.cwd();if(!e)throw new Error("Path required.");let a=l.resolve(e),o=l.resolve(r),c=l.relative(o,a);if(c===""||c.startsWith("..")||l.isAbsolute(c))throw new Error(`Refusing to delete: "${a}" is outside the allowed base "${o}".`);if([l.resolve("/"),process.env.HOME?l.resolve(process.env.HOME):null,process.env.USERPROFILE?l.resolve(process.env.USERPROFILE):null].filter(g=>g!==null).includes(a))throw new Error("Refusing to delete a system directory.");if(a.split(l.sep).filter(Boolean).length<2)throw new Error("Refusing to delete a root-level directory (safety check).");f.existsSync(a)&&f.rmSync(a,{recursive:true,force:true});}function O(e,t={}){try{let r=execSync(e,{shell:process.platform==="win32"?"cmd.exe":"/bin/sh",stdio:t.stdio??"pipe",timeout:t.timeout??12e4,cwd:t.cwd,windowsHide:!0,encoding:"utf8"});return String(r)}catch(r){throw new Error(`Command failed: ${e}
${r.message??String(r)}`)}}function T(e){try{let t=process.platform==="win32"?`where ${e}`:`which ${e}`;return O(t,{stdio:"ignore"}),!0}catch{return  false}}function D(e,t){try{execSync(e,{cwd:t,stdio:"ignore",shell:process.platform==="win32"?"cmd.exe":"/bin/sh",timeout:12e4,windowsHide:!0});}catch{}}function j(e,t){switch(e){case "npm":return `npx ${t}`;case "yarn":return `yarn ${t}`;case "pnpm":return `pnpm ${t}`;case "bun":return `bunx ${t}`}}function b(e,t){return e==="npm"?`npm run ${t}`:`${e} ${t}`}var E={bun:"bun --version",pnpm:"pnpm --version",yarn:"yarn --version",npm:"npm --version"};function le(){let t=[{name:"bun",command:E.bun,priority:4},{name:"pnpm",command:E.pnpm,priority:3},{name:"yarn",command:E.yarn,priority:2},{name:"npm",command:E.npm,priority:1}].filter(r=>{try{return O(r.command,{stdio:"ignore"}),!0}catch{return  false}});if(t.length===0)throw new Error("No package manager found. Install npm, yarn, pnpm, or bun.");return t.sort((r,a)=>a.priority-r.priority)[0].name}function ce(e){if(e)try{return O(E[e],{stdio:"ignore"}),{pm:e,failed:!1,forced:!0}}catch{i.error(`Requested package manager "${e}" was not found on PATH.`),w(1);}try{return {pm:le(),failed:!1,forced:!1}}catch(t){return i.warn(`Could not detect package manager: ${t.message}`),{pm:"npm",failed:true,forced:false}}}async function pe(e,t,r){if(!r)return  false;let a={npm:"npm install --no-audit --no-fund --loglevel=error",yarn:"yarn install --silent --no-progress",pnpm:"pnpm install --reporter=silent",bun:"bun install --silent"};i.step(`Installing dependencies with ${t}...`);try{return O(a[t],{cwd:e,stdio:"inherit",timeout:3e5}),i.success("Dependencies installed."),!0}catch{return i.warn("Auto-install failed. Run manually:"),i.plain(`    ${n.green}cd ${l.basename(e)}${n.reset}`),i.plain(`    ${n.green}${t} install${n.reset}`),false}}function me(e,t){return e.typescript===true?true:e.javascript===true?false:t.typescript}function ue(e){let t=e?"ts":"js";return {main:e?"tsx":"jsx",config:t,api:t}}async function ge(e,t){let r;e.typescript!==void 0?r=e.typescript:A()?r=await X({message:"Use TypeScript?",default:true}):r=true;let a;e.tailwind?a="Tailwind":e.cssModules?a="CSS Modules":e.noStyle?a="None":A()?a=await select({message:"Styling solution?",choices:[{name:"Tailwind CSS",value:"Tailwind"},{name:"CSS Modules",value:"CSS Modules"},{name:"None",value:"None"}],default:"Tailwind"}):a="Tailwind";let o,c=q();if(e.platform&&se(e.platform))o=e.platform;else if(A()){let s=[{name:"Web Application",value:"web"},{name:"Windows Desktop",value:"windows"},{name:"Linux Desktop",value:"linux"},{name:"macOS Desktop",value:"macos"},{name:"Android",value:"android"},{name:"iOS",value:"ios"}];console.log(`
Detected OS: ${c}`),o=await select({message:"Select target platform:",choices:s,default:"web"});}else o="web";let p=t;return o!=="web"&&(e.appName?p=e.appName:A()?p=await input({message:"App name? (used as the app name and window title)",default:L(t),validate:s=>s.trim().length>0?true:"Required."}):p=L(t)),{typescript:r,styling:a,platform:o,appName:p}}async function fe(e){let t=["favicon.ico","apple-touch-icon.png","og-image.png","logo.png"];await Promise.all(t.map(async r=>{let a=l.join(ee,r),o=l.join(e,r);try{await y.access(a),await y.copyFile(a,o);}catch{i.warn(`Asset not found, skipping: ${r}`);}}));}async function he(e){let t={name:"Bini.js App",short_name:"BiniApp",description:"Modern React application built with Bini.js",start_url:"/",display:"standalone",background_color:"#ffffff",theme_color:"#00CFFF",icons:[{src:"/favicon.ico",sizes:"64x64 32x32 24x24 16x16",type:"image/x-icon"},{src:"/apple-touch-icon.png",sizes:"180x180",type:"image/png"}]};await x(l.join(e,"public","site.webmanifest"),JSON.stringify(t,null,2));}async function be(e,t,r,a,o){let c=a==="Tailwind"?`import tailwindcss from '@tailwindcss/vite';
`:"",p=a==="Tailwind"?`
      tailwindcss(),`:"",s=t?`,
    types: ["vite/client"]`:"",g=o?`import { biniNative } from 'bini-native';
`:"",u=o?`
      biniNative(),`:"",h=["'**/dist/**'","'**/node_modules/**'"];o&&(h.push("'**/src-tauri/**'"),h.push("'**/target/**'"),h.push("'**/*.exe'"),h.push("'**/*.dll'"),h.push("'**/*.pdb'"));let d=h.join(`,
          `),m=`import { defineConfig, loadEnv } from 'vite';
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
      biniExport(),${u}
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
`;await x(l.join(e,`vite.config.${r}`),m);}function we(e,t){let r={windows:`
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
----------------------------------------------------------------------`};return r[e==="ios"?"ios":e==="android"?"android":t==="windows"?"windows":t==="macos"?"macos":"linux"]||r.linux}function ve(e){let t=e.toLowerCase().replace(/[^a-z0-9]+/g,""),r=t.length>0?t:"app";return `com.bini.${/^[0-9]/.test(r)?`app${r}`:r}`}async function xe(e,t){let r=l.join(e,"tauri.conf.json");if(f.existsSync(r))try{let a=await y.readFile(r,"utf-8"),o=JSON.parse(a),c=ve(t);if(o.identifier===c){i.skip(`Bundle identifier already set to ${c}`);return}o.identifier=c,await y.writeFile(r,JSON.stringify(o,null,2)+`
`,{mode:416}),i.success(`Bundle identifier set to ${n.cyan}${c}${n.reset}`),i.info("Replace this with your own reverse-DNS identifier before publishing to an app store.");}catch(a){i.warn(`Could not set bundle identifier automatically: ${a.message}`),i.info(`Edit "identifier" in ${r} manually before building for Android/iOS/macOS.`);}}async function M(e,t,r){let a=[];if(r){for(let o of r.split(`
`))a.push(`# ${o}`);a.push("");}for(let[o,c]of Object.entries(t))a.push(`${o}=${c}`);await x(e,a.join(`
`)+`
`,{mode:384});}async function R(e,t){let r=l.join(e,".gitignore"),a="";try{a=await y.readFile(r,"utf-8");}catch{a="";}let o=new Set(a.split(`
`).map(s=>s.trim())),c=t.filter(s=>s.startsWith("#")||!o.has(s));if(c.length===0)return;let p=a.length>0&&!a.endsWith(`
`)?`
`:"";await y.appendFile(r,`${p}
${c.join(`
`)}
`,{mode:416});}async function K(e,t){let r=l.join(e,"tauri.conf.json");if(!f.existsSync(r))return i.warn(`Could not find ${r}.`),false;try{let a=await y.readFile(r,"utf-8"),o=JSON.parse(a);return t(o),await y.writeFile(r,JSON.stringify(o,null,2)+`
`,{mode:416}),!0}catch(a){return i.warn(`Could not update ${r}: ${a.message}`),false}}async function ye(e){let t=l.join(e,"app","build.gradle.kts");if(!f.existsSync(t)){i.warn(`Could not find ${t}. Wire up signingConfigs manually \u2014 see the docs.`);return}try{let r=await y.readFile(t,"utf-8");if(r.includes("keystore.properties")){i.skip("build.gradle.kts already configured for release signing.");return}r.includes("import java.io.FileInputStream")||(r=`import java.io.FileInputStream
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

`;if(!/buildTypes\s*\{/.test(r)){i.warn(`Could not find "buildTypes" block in ${t}. Add signingConfigs manually.`);return}r=r.replace(/(\n[^\S\n]*buildTypes\s*\{)/,`
${a}$1`),/getByName\("release"\)\s*\{/.test(r)?r=r.replace(/(getByName\("release"\)\s*\{)/,`$1
            signingConfig = signingConfigs.getByName("release")`):i.warn(`Could not find getByName("release") in ${t}. Set signingConfig manually.`),await y.writeFile(t,r,{mode:416}),i.success("Wired release signingConfig into build.gradle.kts");}catch(r){i.warn(`Could not patch build.gradle.kts: ${r.message}`),i.info("Configure it manually \u2014 see https://v2.tauri.app/distribute/sign/android/");}}async function ke(e,t,r){if(i.step("Android release signing"),!(r===true?true:await X({message:"Set up Android release signing now?",default:false}))){i.info("Skipped. See: https://v2.tauri.app/distribute/sign/android/");return}let o=l.join(t,"gen","android");if(!f.existsSync(o)){i.warn("Android project not found (src-tauri/gen/android missing). Run Android init first.");return}T("keytool")||i.warn("keytool not found on PATH (ships with the JDK). Add it to PATH or use Android Studio's copy.");let c=await X({message:"Do you already have a keystore (.jks) file?",default:false}),p,s,g;if(c)p=await input({message:"Path to existing keystore file:",validate:d=>f.existsSync(d)?true:"File not found."}),s=await input({message:"Key alias:",default:"upload"}),g=await password({message:"Keystore password:",mask:"*"});else {let d=l.join(e,"keystore.jks");if(p=await input({message:"Where should the keystore be created?",default:d}),s=await input({message:"Key alias:",default:"upload"}),g=await password({message:"Set a keystore password (min 6 chars):",mask:"*"}),f.existsSync(p))i.warn(`File already exists at ${p} \u2014 leaving it untouched.`);else {i.step("Generating keystore with keytool...");let m=`CN=${l.basename(e)}, OU=Dev, O=Bini, L=Unknown, S=Unknown, C=US`,k=`keytool -genkey -v -keystore "${p}" -keyalg RSA -keysize 2048 -validity 10000 -alias "${s}" -storepass "${g}" -keypass "${g}" -dname "${m}"`;try{O(k,{stdio:"pipe",timeout:3e4}),i.success(`Keystore created at ${p}`);}catch(S){i.warn(`Could not generate keystore automatically: ${S.message}`),i.info("Generate it manually with keytool \u2014 see https://v2.tauri.app/distribute/sign/android/");return}}}let u=l.join(o,"keystore.properties"),h=process.platform==="win32"?p.replace(/\\/g,"\\\\"):p;await x(u,`password=${g}
keyAlias=${s}
storeFile=${h}
`,{mode:384}),i.success(`Wrote ${l.relative(e,u)}`),await R(e,["# Android signing (never commit)","src-tauri/gen/android/keystore.properties","*.jks","*.keystore"]),await ye(o),i.success("Android release signing configured. `pnpm android:build` will now produce a signed release.");}async function Xe(e,t){if(i.step("Windows code signing"),!(t===true?true:await X({message:"Configure Windows code signing now?",default:false}))){i.info("Skipped. See: https://v2.tauri.app/distribute/sign/windows/");return}i.plain(`${n.dim}Requires a code signing certificate already imported into your Windows
certificate store (Import-PfxCertificate). See the docs if you haven't done that yet.${n.reset}`);let a=await input({message:"Certificate thumbprint (Personal > Certificates > Details in certmgr.msc):",validate:s=>s.trim().length>0?true:"Required."}),o=await select({message:"Digest algorithm:",choices:[{name:"sha256",value:"sha256"},{name:"sha1",value:"sha1"}],default:"sha256"}),c=await input({message:"Timestamp server URL:",default:"http://timestamp.comodoca.com"});await K(e,s=>{s.bundle=s.bundle??{},s.bundle.windows={...s.bundle.windows??{},certificateThumbprint:a,digestAlgorithm:o,timestampUrl:c};})&&(i.success("Windows signing configured in tauri.conf.json"),i.info("Cross-compiling from Linux/macOS requires a custom signCommand instead \u2014 see the docs."));}async function Se(e,t,r){if(i.step("macOS code signing"),!(r===true?true:await X({message:"Configure macOS code signing now?",default:false}))){i.info("Skipped. See: https://v2.tauri.app/distribute/sign/macos/");return}let o=await select({message:"Signing method:",choices:[{name:"Ad-hoc (local testing, no Apple Developer account)",value:"adhoc"},{name:"Apple Developer signing identity (Distribution / Developer ID)",value:"identity"}],default:"adhoc"}),c=o==="adhoc"?"-":await input({message:'Signing identity (from "security find-identity -v -p codesigning"):',validate:d=>d.trim().length>0?true:"Required."});if(await K(t,d=>{d.bundle=d.bundle??{},d.bundle.macOS={...d.bundle.macOS??{},signingIdentity:c};})&&i.success(`macOS signingIdentity set to "${c}" in tauri.conf.json`),o!=="identity"||!await X({message:"Set up notarization credentials too? (avoids the 'unidentified developer' warning)",default:false}))return;let g=await select({message:"Notarization method:",choices:[{name:"App Store Connect API key",value:"apiKey"},{name:"Apple ID + app-specific password",value:"appleId"}],default:"apiKey"}),u={};g==="apiKey"?(u.APPLE_API_ISSUER=await input({message:"APPLE_API_ISSUER (Issuer ID):"}),u.APPLE_API_KEY=await input({message:"APPLE_API_KEY (Key ID):"}),u.APPLE_API_KEY_PATH=await input({message:"Path to downloaded .p8 private key:",validate:d=>f.existsSync(d)?true:"File not found."})):(u.APPLE_ID=await input({message:"Apple ID email:"}),u.APPLE_PASSWORD=await password({message:"App-specific password:",mask:"*"}),u.APPLE_TEAM_ID=await input({message:"Apple Team ID:"}));let h=l.join(e,".env.signing");await M(h,u,"macOS notarization credentials \u2014 never commit this file.\nRun `source .env.signing` before `pnpm tauri:build`."),await R(e,["# Code signing secrets (never commit)",".env.signing"]),i.success(`Wrote notarization credentials to ${l.relative(e,h)}`),i.info('Run "source .env.signing" before building to notarize your app.');}async function $e(e,t){if(i.step("Linux AppImage signing"),!(t===true?true:await X({message:"Configure AppImage signing (gpg) now?",default:false}))){i.info("Skipped. See: https://v2.tauri.app/distribute/sign/linux/");return}if(!T("gpg")&&!T("gpg2")){i.warn("gpg/gpg2 not found. Install it, generate a key with `gpg2 --full-gen-key`, then re-run.");return}let a=await input({message:"GPG key ID to sign with (blank = default key):"}),c={SIGN:"1",APPIMAGETOOL_SIGN_PASSPHRASE:await password({message:"GPG key passphrase:",mask:"*"})};a.trim()&&(c.SIGN_KEY=a.trim());let p=l.join(e,".env.signing");await M(p,c,"AppImage signing secrets \u2014 never commit this file.\nRun `source .env.signing` before `pnpm tauri:build`."),await R(e,["# Code signing secrets (never commit)",".env.signing"]),i.success(`Wrote AppImage signing config to ${l.relative(e,p)}`),i.info('Run "source .env.signing" before building to sign the AppImage.');}async function Ae(e,t){if(i.step("iOS code signing"),!(t===true?true:await X({message:"Configure iOS code signing now?",default:false}))){i.info("Skipped. Xcode-managed automatic signing is used by default.");return}if(await select({message:"Signing method:",choices:[{name:"Automatic (Xcode-managed, recommended for local builds)",value:"automatic"},{name:"Manual (certificate + provisioning profile, for CI)",value:"manual"}],default:"automatic"})==="automatic"){i.info("Nothing to configure locally \u2014 sign in with your Apple ID in Xcode (Settings > Accounts).");return}let o=await input({message:"Path to exported certificate (.p12):",validate:s=>f.existsSync(s)?true:"File not found."}),c=await password({message:"Certificate export password:",mask:"*"}),p=await input({message:"Path to provisioning profile (.mobileprovision):",validate:s=>f.existsSync(s)?true:"File not found."});try{let s=(await y.readFile(o)).toString("base64"),g=(await y.readFile(p)).toString("base64"),u=l.join(e,".env.signing");await M(u,{IOS_CERTIFICATE:s,IOS_CERTIFICATE_PASSWORD:c,IOS_MOBILE_PROVISION:g},"iOS manual signing secrets \u2014 never commit this file.\nRun `source .env.signing` before `pnpm tauri ios build`."),await R(e,["# Code signing secrets (never commit)",".env.signing"]),i.success(`Wrote iOS signing credentials to ${l.relative(e,u)}`),i.info('Run "source .env.signing" before building to sign your iOS app.');}catch(s){i.warn(`Could not read/encode certificate or profile: ${s.message}`);}}async function Pe(e,t,r,a){if(a===false){i.info("Skipping code signing setup (--nosign). See https://v2.tauri.app/distribute/sign/");return}if(!A()){i.info("Skipping code signing setup (non-interactive). See https://v2.tauri.app/distribute/sign/");return}switch(r){case "android":await ke(e,t,a);break;case "windows":await Xe(t,a);break;case "macos":await Se(e,t,a);break;case "linux":await $e(e,a);break;case "ios":await Ae(e,a);break}}async function Ce(e,t,r,a,o,c,p){i.step(`Setting up Tauri for ${t} on ${r}`),i.step("Installing Tauri dependencies...");let s=[{type:"dev",packages:["@tauri-apps/cli@latest","cross-env@latest","bini-native@latest"]},{type:"prod",packages:["@tauri-apps/api@latest"]}];for(let d of s){let m=d.type==="dev"?`${a} add -D ${d.packages.join(" ")}`:`${a} add ${d.packages.join(" ")}`;try{D(m,e);}catch{}}i.success("Tauri dependencies installed");let g=l.join(e,"src-tauri");if(f.existsSync(g))i.skip("Tauri already initialized");else {i.step("Initializing Tauri with auto-filled values...");let d=`npx @tauri-apps/cli init       --app-name "${c}"       --window-title "${c}"       --frontend-dist "../dist"       --dev-url "http://localhost:3000"       --before-dev-command "${b(a,"dev")}"       --before-build-command "${b(a,"build")}"       --force`;i.command(d);try{execSync(d,{cwd:e,stdio:"inherit",timeout:6e4,shell:process.platform==="win32"?"cmd.exe":"/bin/sh",env:{...process.env,FORCE_COLOR:"true"}}),i.success("Tauri initialized with auto-filled values");}catch{i.warn("Tauri init failed. Please run manually:"),i.plain(`  ${n.yellow}${d}${n.reset}`);return}}await xe(g,o);let u=l.join(g,"icons");if(f.existsSync(u)){i.step("Removing existing Tauri icons...");try{f.rmSync(u,{recursive:!0,force:!0}),i.success("Existing icons removed");}catch(d){i.warn(`Could not remove icons: ${d instanceof Error?d.message:String(d)}`);}}i.step("Generating Tauri icons from public/logo.png...");let h=j(a,"tauri icon public/logo.png");i.command(h);try{execSync(h,{cwd:e,stdio:"inherit",timeout:6e4,shell:process.platform==="win32"?"cmd.exe":"/bin/sh"}),i.success("Tauri icons generated from logo.png");}catch{i.warn("Could not generate icons automatically."),i.info(`Run: ${n.cyan}${h}${n.reset}`);}if(t==="android"){let d=l.join(e,"src-tauri","gen","android");if(f.existsSync(d))i.skip("Android support already initialized");else {i.step("Initializing Android support...");let m=j(a,"tauri android init");i.command(m);try{execSync(m,{cwd:e,stdio:"inherit",timeout:12e4,shell:process.platform==="win32"?"cmd.exe":"/bin/sh"}),i.success("Android support initialized");}catch{i.warn("Android init failed. Please run manually:"),i.plain(`  ${n.yellow}${m}${n.reset}`);}}}if(t==="ios"){let d=l.join(e,"src-tauri","gen","ios");if(f.existsSync(d))i.skip("iOS support already initialized");else {i.step("Initializing iOS support...");let m=j(a,"tauri ios init");if(i.command(m),r==="macos")try{execSync(m,{cwd:e,stdio:"inherit",timeout:12e4,shell:process.platform==="win32"?"cmd.exe":"/bin/sh"}),i.success("iOS support initialized");}catch{i.warn(`iOS init failed. Please run manually: ${m}`);}else i.warn("iOS initialization skipped (requires macOS)");}}if(await Pe(e,g,t,p),i.step("Setup Instructions"),i.plain(we(t,r)),i.step("Checking prerequisites..."),t==="android"){T("java")||i.warn("Java JDK 17 not found (required for Android)"),process.env.ANDROID_HOME||i.warn("ANDROID_HOME not set (required for Android)"),i.step("Adding Rust Android targets");let d=["aarch64-linux-android","armv7-linux-androideabi","i686-linux-android","x86_64-linux-android"];for(let m of d){i.command(`rustup target add ${m}`);try{execSync(`rustup target list | grep ${m}`,{stdio:"pipe",shell:process.platform==="win32"?"cmd.exe":"/bin/sh"}).toString().includes("installed")||D(`rustup target add ${m}`,e);}catch{D(`rustup target add ${m}`,e);}}i.success("Rust Android targets ready");}if(t==="ios"&&r!=="macos"&&i.warn("iOS development requires macOS with Xcode"),r==="windows"&&t==="windows"&&!T("cl")&&i.warn("Visual Studio Build Tools not found (required for Windows)"),i.success(`Tauri setup complete for ${t}`),i.step("Available Commands"),t==="android"){let d=b(a,"android"),m=b(a,"android:build");i.plain(`
  ${n.green}${n.bold}Run on Android:${n.reset} ${n.cyan}${d}${n.reset}`),i.plain(`  ${n.green}${n.bold}Build APK:${n.reset} ${n.cyan}${m}${n.reset}`),i.plain(`  ${n.green}${n.bold}Manual Command:${n.reset} ${n.dim}npx @tauri-apps/cli android dev${n.reset}
`),i.plain(`  ${n.yellow}${n.bold}Quick Start Guide:${n.reset}`),i.plain("  1. Start an Android emulator or connect a device with USB debugging"),i.plain(`  2. Run: ${n.green}${d}${n.reset}`),i.plain(`  3. Build APK: ${n.green}${m}${n.reset}
`);}else {let m={windows:{dev:b(a,"tauri:dev"),build:b(a,"tauri:build")},linux:{dev:b(a,"tauri:dev"),build:b(a,"tauri:build")},macos:{dev:b(a,"tauri:dev"),build:b(a,"tauri:build")},android:{dev:b(a,"android"),build:b(a,"android:build")},ios:{dev:b(a,"ios"),build:b(a,"ios:build")}}[t];i.plain(`
  ${n.green}${n.bold}Development:${n.reset} ${m.dev}`),i.plain(`  ${n.green}${n.bold}Build:${n.reset} ${m.build}
`);}}function Ee(){return `* { box-sizing: border-box; }
html { font-family: system-ui, -apple-system, 'Segoe UI', sans-serif; -webkit-font-smoothing: antialiased; }
body { line-height: 1.5; min-height: 100vh; margin: 0; }
#root { min-height: 100vh; }
`}function Ne(){return `.root { 
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: #ffffff; 
  display: flex; 
  flex-direction: column; 
  padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
}

.hero { 
  flex: 1; 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  justify-content: center; 
  text-align: center; 
  padding: 0.5rem 1rem 0.25rem;
  gap: 0.25rem; 
  overflow: hidden;
}

@media (min-width: 640px) {
  .hero { padding: 1rem 2rem 0.5rem; gap: 0.5rem; }
}

@media (min-width: 768px) {
  .hero { padding: 1.5rem 2rem 0.75rem; gap: 0.75rem; }
}

.hero-logo { 
  width: 2.5rem; 
  height: 2.5rem; 
  object-fit: contain;
  flex-shrink: 0;
}

@media (min-width: 640px) {
  .hero-logo { width: 3.5rem; height: 3.5rem; }
}

@media (min-width: 768px) {
  .hero-logo { width: 4rem; height: 4rem; }
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
  font-size: 1.25rem; 
  font-weight: 700; 
  letter-spacing: -0.04em; 
  color: #000000; 
  margin: 0; 
  line-height: 1.1; 
}

@media (min-width: 640px) {
  .title { font-size: 1.75rem; }
}

@media (min-width: 768px) {
  .title { font-size: 2.25rem; }
}

@media (min-width: 1024px) {
  .title { font-size: 2.75rem; }
}

.gradient { 
  background: linear-gradient(to right, #22D3EE, #3B82F6); 
  -webkit-background-clip: text; 
  -webkit-text-fill-color: transparent; 
  background-clip: text; 
}

.subtitle { 
  font-size: 0.75rem; 
  color: #737373; 
  margin: 0; 
  max-width: 18rem; 
  line-height: 1.4; 
  padding: 0 0.5rem;
}

@media (min-width: 640px) {
  .subtitle { font-size: 0.875rem; max-width: 22rem; padding: 0; }
}

@media (min-width: 768px) {
  .subtitle { font-size: 1rem; max-width: 26rem; }
}

.hint { 
  font-size: 0.5rem; 
  color: #a3a3a3; 
  margin: 0; 
  padding: 0 0.5rem;
}

@media (min-width: 640px) {
  .hint { font-size: 0.625rem; padding: 0; }
}

@media (min-width: 768px) {
  .hint { font-size: 0.75rem; }
}

.platforms { 
  display: flex; 
  flex-wrap: wrap; 
  align-items: center; 
  justify-content: center; 
  gap: 0.125rem; 
  padding: 0 0.125rem;
  max-width: 18rem;
}

@media (min-width: 640px) {
  .platforms { gap: 0.25rem; padding: 0; max-width: 22rem; }
}

@media (min-width: 768px) {
  .platforms { gap: 0.375rem; max-width: 24rem; }
}

.platform-badge { 
  font-size: 0.45rem; 
  font-weight: 500; 
  color: #737373; 
  background: #f5f5f5; 
  border: 1px solid #e5e5e5; 
  border-radius: 9999px; 
  padding: 0.0625rem 0.375rem; 
}

@media (min-width: 640px) {
  .platform-badge { 
    font-size: 0.5rem; 
    padding: 0.0625rem 0.5rem; 
  }
}

@media (min-width: 768px) {
  .platform-badge { 
    font-size: 0.625rem; 
    padding: 0.125rem 0.625rem; 
  }
}

@media (min-width: 1024px) {
  .platform-badge { 
    font-size: 0.75rem; 
    padding: 0.25rem 0.75rem; 
  }
}

.code { 
  font-family: monospace; 
  font-size: 0.45rem; 
  background: #f5f5f5; 
  color: #404040; 
  padding: 0.0625rem 0.25rem; 
  border-radius: 4px; 
  border: 1px solid #e5e5e5; 
}

@media (min-width: 640px) {
  .code { font-size: 0.5rem; padding: 0.0625rem 0.375rem; }
}

@media (min-width: 768px) {
  .code { font-size: 0.625rem; padding: 0.125rem 0.375rem; }
}

@media (min-width: 1024px) {
  .code { font-size: 0.75rem; padding: 0.2rem 0.5rem; }
}

.links-section { 
  flex-shrink: 0;
  padding: 0 0.5rem 0.5rem;
}

@media (min-width: 640px) {
  .links-section { padding: 0 1rem 1rem; }
}

@media (min-width: 768px) {
  .links-section { padding: 0 1.5rem 1.5rem; }
}

.grid { 
  display: grid; 
  grid-template-columns: repeat(2, 1fr); 
  gap: 0.375rem; 
  max-width: 22rem; 
  margin: 0 auto; 
}

@media (min-width: 640px) {
  .grid { gap: 0.5rem; max-width: 30rem; }
}

@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(4, 1fr); gap: 0.75rem; max-width: 38rem; }
}

.card { 
  display: flex; 
  flex-direction: column; 
  align-items: center;
  justify-content: center;
  gap: 0.0625rem; 
  padding: 0.375rem 0.125rem; 
  border-radius: 6px; 
  border: 1px solid #e5e5e5; 
  text-decoration: none; 
  transition: border-color 0.15s, background 0.15s; 
  min-height: 2rem;
}

@media (min-width: 640px) {
  .card { 
    gap: 0.125rem; 
    padding: 0.5rem 0.5rem; 
    border-radius: 8px; 
    min-height: 2.5rem;
  }
}

@media (min-width: 768px) {
  .card { gap: 0.25rem; padding: 0.75rem; border-radius: 10px; min-height: 3rem; }
}

.card:hover { 
  border-color: #d4d4d4; 
  background: #fafafa; 
}

.card-label { 
  font-size: 0.5rem; 
  font-weight: 600; 
  color: #000000; 
  text-align: center;
}

@media (min-width: 640px) {
  .card-label { font-size: 0.625rem; }
}

@media (min-width: 768px) {
  .card-label { font-size: 0.75rem; }
}

@media (min-width: 1024px) {
  .card-label { font-size: 0.875rem; }
}

.card-desc { 
  font-size: 0.4rem; 
  color: #737373; 
  line-height: 1.2; 
  text-align: center;
  display: none;
}

@media (min-width: 640px) {
  .card-desc { 
    font-size: 0.5rem; 
    display: block;
  }
}

@media (min-width: 768px) {
  .card-desc { font-size: 0.625rem; }
}

@media (min-width: 1024px) {
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
`}function Te(){return `.root { 
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: #ffffff; 
  display: flex; 
  flex-direction: column; 
  padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
}

.hero { 
  flex: 1; 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  justify-content: center; 
  text-align: center; 
  padding: 0.5rem 1rem 0.25rem;
  gap: 0.25rem; 
  overflow: hidden;
}

@media (min-width: 640px) {
  .hero { padding: 1rem 2rem 0.5rem; gap: 0.5rem; }
}

@media (min-width: 768px) {
  .hero { padding: 1.5rem 2rem 0.75rem; gap: 0.75rem; }
}

.heroLogo { 
  width: 2.5rem; 
  height: 2.5rem; 
  object-fit: contain;
  flex-shrink: 0;
}

@media (min-width: 640px) {
  .heroLogo { width: 3.5rem; height: 3.5rem; }
}

@media (min-width: 768px) {
  .heroLogo { width: 4rem; height: 4rem; }
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
  font-size: 1.25rem; 
  font-weight: 700; 
  letter-spacing: -0.04em; 
  color: #000000; 
  margin: 0; 
  line-height: 1.1; 
}

@media (min-width: 640px) {
  .title { font-size: 1.75rem; }
}

@media (min-width: 768px) {
  .title { font-size: 2.25rem; }
}

@media (min-width: 1024px) {
  .title { font-size: 2.75rem; }
}

.gradient { 
  background: linear-gradient(to right, #22D3EE, #3B82F6); 
  -webkit-background-clip: text; 
  -webkit-text-fill-color: transparent; 
  background-clip: text; 
}

.subtitle { 
  font-size: 0.75rem; 
  color: #737373; 
  margin: 0; 
  max-width: 18rem; 
  line-height: 1.4; 
  padding: 0 0.5rem;
}

@media (min-width: 640px) {
  .subtitle { font-size: 0.875rem; max-width: 22rem; padding: 0; }
}

@media (min-width: 768px) {
  .subtitle { font-size: 1rem; max-width: 26rem; }
}

.hint { 
  font-size: 0.5rem; 
  color: #a3a3a3; 
  margin: 0; 
  padding: 0 0.5rem;
}

@media (min-width: 640px) {
  .hint { font-size: 0.625rem; padding: 0; }
}

@media (min-width: 768px) {
  .hint { font-size: 0.75rem; }
}

.platforms { 
  display: flex; 
  flex-wrap: wrap; 
  align-items: center; 
  justify-content: center; 
  gap: 0.125rem; 
  padding: 0 0.125rem;
  max-width: 18rem;
}

@media (min-width: 640px) {
  .platforms { gap: 0.25rem; padding: 0; max-width: 22rem; }
}

@media (min-width: 768px) {
  .platforms { gap: 0.375rem; max-width: 24rem; }
}

.platformBadge { 
  font-size: 0.45rem; 
  font-weight: 500; 
  color: #737373; 
  background: #f5f5f5; 
  border: 1px solid #e5e5e5; 
  border-radius: 9999px; 
  padding: 0.0625rem 0.375rem; 
}

@media (min-width: 640px) {
  .platformBadge { 
    font-size: 0.5rem; 
    padding: 0.0625rem 0.5rem; 
  }
}

@media (min-width: 768px) {
  .platformBadge { 
    font-size: 0.625rem; 
    padding: 0.125rem 0.625rem; 
  }
}

@media (min-width: 1024px) {
  .platformBadge { 
    font-size: 0.75rem; 
    padding: 0.25rem 0.75rem; 
  }
}

.code { 
  font-family: monospace; 
  font-size: 0.45rem; 
  background: #f5f5f5; 
  color: #404040; 
  padding: 0.0625rem 0.25rem; 
  border-radius: 4px; 
  border: 1px solid #e5e5e5; 
}

@media (min-width: 640px) {
  .code { font-size: 0.5rem; padding: 0.0625rem 0.375rem; }
}

@media (min-width: 768px) {
  .code { font-size: 0.625rem; padding: 0.125rem 0.375rem; }
}

@media (min-width: 1024px) {
  .code { font-size: 0.75rem; padding: 0.2rem 0.5rem; }
}

.linksSection { 
  flex-shrink: 0;
  padding: 0 0.5rem 0.5rem;
}

@media (min-width: 640px) {
  .linksSection { padding: 0 1rem 1rem; }
}

@media (min-width: 768px) {
  .linksSection { padding: 0 1.5rem 1.5rem; }
}

.grid { 
  display: grid; 
  grid-template-columns: repeat(2, 1fr); 
  gap: 0.375rem; 
  max-width: 22rem; 
  margin: 0 auto; 
}

@media (min-width: 640px) {
  .grid { gap: 0.5rem; max-width: 30rem; }
}

@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(4, 1fr); gap: 0.75rem; max-width: 38rem; }
}

.card { 
  display: flex; 
  flex-direction: column; 
  align-items: center;
  justify-content: center;
  gap: 0.0625rem; 
  padding: 0.375rem 0.125rem; 
  border-radius: 6px; 
  border: 1px solid #e5e5e5; 
  text-decoration: none; 
  transition: border-color 0.15s, background 0.15s; 
  min-height: 2rem;
}

@media (min-width: 640px) {
  .card { 
    gap: 0.125rem; 
    padding: 0.5rem 0.5rem; 
    border-radius: 8px; 
    min-height: 2.5rem;
  }
}

@media (min-width: 768px) {
  .card { gap: 0.25rem; padding: 0.75rem; border-radius: 10px; min-height: 3rem; }
}

.card:hover { 
  border-color: #d4d4d4; 
  background: #fafafa; 
}

.cardLabel { 
  font-size: 0.5rem; 
  font-weight: 600; 
  color: #000000; 
  text-align: center;
}

@media (min-width: 640px) {
  .cardLabel { font-size: 0.625rem; }
}

@media (min-width: 768px) {
  .cardLabel { font-size: 0.75rem; }
}

@media (min-width: 1024px) {
  .cardLabel { font-size: 0.875rem; }
}

.cardDesc { 
  font-size: 0.4rem; 
  color: #737373; 
  line-height: 1.2; 
  text-align: center;
  display: none;
}

@media (min-width: 640px) {
  .cardDesc { 
    font-size: 0.5rem; 
    display: block;
  }
}

@media (min-width: 768px) {
  .cardDesc { font-size: 0.625rem; }
}

@media (min-width: 1024px) {
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
`}function Oe(e){let t=Ee();return e==="Tailwind"?`@import "tailwindcss";

${t}`:e==="CSS Modules"?t:t+`
`+Ne()}function Re(e,t,r,a){let o=a!=="web",c={react:"latest","react-dom":"latest","react-router-dom":"latest",hono:"latest","bini-router":"latest","bini-overlay":"latest","bini-server":"latest"},p={"@vitejs/plugin-react":"latest",vite:"latest",oxlint:"latest",oxfmt:"latest","bini-env":"latest","bini-export":"latest"};o&&(p["@tauri-apps/cli"]="latest",p["cross-env"]="latest",p["bini-native"]="latest",c["@tauri-apps/api"]="latest"),t&&Object.assign(p,{"@types/react":"latest","@types/react-dom":"latest","@types/node":"latest",typescript:"latest"}),r==="Tailwind"&&Object.assign(p,{tailwindcss:"latest","@tailwindcss/vite":"latest"});let s={dev:o?"vite":"vite --host --open",build:t?"tsc --noEmit && vite build":"vite build",export:"vite build --mode export",start:"bini-server",preview:"vite preview --host --open","type-check":t?"tsc --noEmit":"echo 'TypeScript not enabled'",lint:"oxlint src",format:"oxfmt src",check:t?"oxlint src && oxfmt src && tsc --noEmit":"oxlint src && oxfmt src"};return o&&(s.predev="npx @tauri-apps/cli icon public/logo.png",s.prebuild="npx @tauri-apps/cli icon public/logo.png",s["tauri:dev"]="cross-env TAURI=true tauri dev",s["tauri:build"]="cross-env TAURI=true tauri build",s["tauri:icon"]="npx @tauri-apps/cli icon public/logo.png",s.android="npx @tauri-apps/cli android dev",s["android:dev"]="npx @tauri-apps/cli android dev",s["android:build"]="npx @tauri-apps/cli android build",s.ios="npx @tauri-apps/cli ios dev",s["ios:dev"]="npx @tauri-apps/cli ios dev",s["ios:build"]="npx @tauri-apps/cli ios build"),a==="ios"&&(s.tauri="npx @tauri-apps/cli"),{name:e,type:"module",version:"1.0.0",scripts:s,dependencies:c,devDependencies:p}}var B=`[
  { label: 'Docs',     desc: 'Read the documentation',   href: 'https://bini.js.org'                           },
  { label: 'Examples', desc: 'Browse starter templates', href: 'https://github.com/Binidu01/bini-examples'     },
  { label: 'npm',      desc: 'View on npm registry',     href: 'https://www.npmjs.com/package/create-bini-app' },
  { label: 'GitHub',   desc: 'Star us on GitHub',        href: 'https://github.com/Binidu01'                   },
]`,F="['Web', 'Windows', 'macOS', 'Linux', 'Android', 'iOS']";function Ie(e,t){let r=e==="tsx";return t==="Tailwind"?`import React from 'react';

const links = ${B};
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
  return (
    <div className="h-screen w-screen overflow-hidden bg-white dark:bg-black flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-8 pt-4 pb-2 gap-1 sm:gap-3 overflow-hidden">
        <img 
          src="/logo.png" 
          alt="Bini.js Logo" 
          className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain flex-shrink-0"
        />
        
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-black dark:text-white leading-tight">
          Welcome to{' '}
          <GradientText className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
            Bini.js
          </GradientText>
        </h1>
        
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-xs sm:max-w-md px-2">
          Build full-stack React apps that run on web, desktop, and mobile \u2014 powered by Tauri.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 px-2 max-w-xs sm:max-w-md">
          {platforms.map((p) => (
            <span key={p}
              className="text-[8px] sm:text-[10px] md:text-xs font-medium text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full px-1.5 sm:px-2.5 py-0.5">
              {p}
            </span>
          ))}
        </div>
        
        <p className="text-[9px] sm:text-xs text-neutral-400 dark:text-neutral-500 px-2">
          Edit{' '}
          <code className="font-mono text-[8px] sm:text-[10px] bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 px-1.5 py-0.5 rounded border border-neutral-200 dark:border-neutral-800">
            src/app/page.${e}
          </code>
        </p>
      </main>
      
      <section className="flex-shrink-0 px-2 sm:px-4 pb-3 sm:pb-5 pt-0">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2 max-w-md sm:max-w-2xl mx-auto">
          {links.map((l) => (
            <a 
              key={l.label} 
              href={l.href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-0 p-1.5 sm:p-2.5 md:p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-950 transition-colors min-h-[36px] sm:min-h-[44px]"
            >
              <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-black dark:text-white">{l.label} \u2197</span>
              <span className="text-[7px] sm:text-[9px] md:text-[10px] text-neutral-500 dark:text-neutral-400 leading-tight text-center hidden sm:block">{l.desc}</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
`:t==="CSS Modules"?`import React from 'react';
import styles from './page.module.css';

const links = ${B};
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
          Edit <code className={styles.code}>src/app/page.${e}</code>
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
          Edit <code className="code">src/app/page.${e}</code>
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
`}async function De(e,t,r,a,o){let c=l.join(e,"src/app"),p=r?"{ children }: { children: React.ReactNode }":"{ children }",s=`import React from 'react';
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
`;await Promise.all([x(l.join(e,"src",`main.${t}`),s),x(l.join(c,`layout.${t}`),`import React from 'react';
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
`),x(l.join(c,`page.${t}`),Ie(t,a))]);}async function je(e,t){await x(l.join(e,`src/app/api/hello.${t}`),`import { Hono } from 'hono'

const app = new Hono()

app.all('/hello', (c) => {
  return c.json({
    message  : 'Hello from Bini.js!',
    timestamp: new Date().toISOString(),
    method   : c.req.method,
  })
})

export default app
`);}function Be(e,t,r,a,o,c){return `# ${e}

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
${t?`
- **TypeScript** \u2014 static type safety`:""}

---

# Documentation

https://bini.js.org

---

Built with **Bini.js v${H}**`}async function Fe(e){await x(l.join(e,"tsconfig.json"),JSON.stringify({compilerOptions:{target:"ES2022",lib:["ES2022","DOM","DOM.Iterable"],module:"ESNext",skipLibCheck:true,moduleResolution:"bundler",allowImportingTsExtensions:true,allowArbitraryExtensions:true,resolveJsonModule:true,isolatedModules:true,noEmit:true,jsx:"react-jsx",strict:true,paths:{"@/*":["./src/*"]},forceConsistentCasingInFileNames:true,types:["vite/client"]},include:["src"],exclude:["node_modules","dist"]},null,2));}async function Me(e){await x(l.join(e,".oxlintrc.json"),JSON.stringify({$schema:"./node_modules/oxlint/configuration_schema.json",plugins:["react"],env:{browser:true,es2022:true},ignorePatterns:["dist","node_modules"]},null,2)),await x(l.join(e,".oxfmtrc.json"),JSON.stringify({semi:false,singleQuote:true,tabWidth:2,printWidth:100,trailingComma:"es5",sortImports:true,sortTailwindcssClasses:true},null,2));}function ze(e){return `node_modules/
dist/
.env
.env.local
.env.*.local
.DS_Store
Thumbs.db
*.log

netlify/edge-functions/api.${e}
`}async function _e(e,t,r,a){let o=l.join(process.cwd(),e),c=l.join(o,"public");f.existsSync(o)&&!r.force&&(i.error(`Directory "${e}" already exists. Use --force to overwrite.`),w(1)),r.force&&f.existsSync(o)&&(i.warn(`Removing existing directory: ${n.dim}${o}${n.reset}`),de(o)),i.info(`Creating project in ${n.cyan}${o}${n.reset}`),re(100);let p=me(r,t),s=ue(p);U(l.join(o,"src/app/api")),U(c),i.info("Scaffolding project files");let g=t.platform!=="web",u=g?t.platform:null,h=Re(e,p,t.styling,t.platform);await Promise.all([fe(c),he(o),x(l.join(o,"index.html"),`<!DOCTYPE html>
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
`),De(o,s.main,p,t.styling,g),t.styling==="CSS Modules"?x(l.join(o,"src/app/page.module.css"),Te()):Promise.resolve(),x(l.join(o,"src/app/globals.css"),Oe(t.styling)),je(o,s.api),x(l.join(o,".gitignore"),ze(s.api)),x(l.join(o,"package.json"),JSON.stringify(h,null,2)),be(o,p,s.config,t.styling,g),p?Fe(o):Promise.resolve(),Me(o)]),i.success(`Generated ${n.green}${p?"TypeScript":"JavaScript"}${n.reset} project with ${n.green}${t.styling}${n.reset} styling`);let{pm:d,failed:m}=ce(r.packageManager);m||i.info(r.packageManager?`Package manager: ${n.cyan}${d}${n.reset} (forced via --${d})`:`Package manager: ${n.cyan}${d}${n.reset}`),g&&u&&await Ce(o,u,a,d,e,t.appName,r.sign);let k=false;r.install===true?k=true:r.install===false?k=false:A()&&(k=await X({message:"Install dependencies now?",default:true}));let S=false;m||(S=await pe(o,d,k)),await x(l.join(o,"README.md"),Be(e,p,s,d)),i.plain(`
${n.green}${n.bold}OK${n.reset} ${n.bold}Project created!${n.reset} ${n.cyan}${e}${n.reset} at ${n.dim}${o}${n.reset}
`),m&&i.warn(`README uses "npm" as placeholder \u2014 update manually if needed.
`),i.success("Get started:"),i.plain(`
  ${n.green}cd ${e}${n.reset}`),!S&&!m&&i.plain(`  ${n.green}${d} install${n.reset}`),g&&u?u==="android"?(i.plain(`
${n.bold}${n.cyan}Android Commands:${n.reset}`),i.plain(`  ${n.green}${b(d,"android")}${n.reset}          # Run on Android emulator/device`),i.plain(`  ${n.green}${b(d,"android:build")}${n.reset}    # Build APK`)):u==="ios"?(i.plain(`  ${n.green}${b(d,"ios")}${n.reset}  # Run on iOS (macOS only)`),i.plain(`  ${n.green}${b(d,"ios:build")}${n.reset}  # Build iOS app`)):i.plain(`  ${n.green}${b(d,"tauri:dev")}${n.reset}  # Launches ${u} desktop app`):i.plain(`  ${n.green}${b(d,"dev")}${n.reset}`),i.plain(`
${n.green}Happy coding!${n.reset}`);}async function Le(){ae();let{projectName:e,flags:t}=oe(),r=q();i.plain(ie),i.info(`Detected OS: ${r}`);let a=e;a||(A()||(i.error("Project name required in non-interactive mode."),w(1)),a=await input({message:"Project name?",default:"my-bini-app",validate:c=>c?W(c)?true:"Lowercase letters, numbers, hyphens only. Max 50 chars.":"Name required."})),W(a)||(i.error("Invalid project name. Use lowercase letters, numbers, and hyphens only. Max 50 chars."),w(1));let o=await ge(t,a);await _e(a,o,t,r);}Le().catch(e=>{i.error(`Fatal: ${e instanceof Error?e.message:String(e)}`),w(1);});
# Engineering Portfolio

A deliberately simple portfolio built with HTML, CSS and vanilla JavaScript.

## Structure

- `index.html` — one HTML shell
- `css/style.css` — all styling
- `js/app.js` — project data + routing + lightbox
- `images/` — replace the SVG placeholders with your real images

## Add a project

Open `js/app.js` and add an object to the `projects` array:

```js
{
  id: "my-project",
  title: "MY PROJECT",
  type: "ENGINEERING",
  year: "2026",
  image: "images/my-project.jpg",
  description: "Short project description.",
  role: "Design / fabrication",
  tools: "CAD / CNC / electronics",
  images: [
    "images/my-project.jpg",
    "images/my-project-detail.jpg",
    "images/my-project-cad.jpg"
  ]
}
```

Then put the images in `images/`. Add as many image paths as you want to the `images` array. The project page automatically lays them out as an editorial collage; there is no hard image limit. Clicking any image opens a full-screen viewer with previous/next arrows; left/right keyboard arrows also work.

No build system, framework or npm install is required. Open `index.html` directly in a browser, or serve the folder with any simple static server.


## YouTube videos

Each project has a `youtube` field. Paste either the full YouTube URL or the 11-character video ID:

```js
youtube: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID"
```

The project page puts the main video in a full-width 16:9 section above the image collage so it is prominent rather than squeezed into a corner. If the field is empty, an unobtrusive placeholder explains where to add it.

### Profile photo

The homepage and About page both use `images/profile.jpg` for the profile picture. Replace that file with your own photo (JPG, PNG, or WebP) and keep the filename as `profile.jpg`, or update the `src="images/profile.jpg"` references in `js/app.js`.

# Asset provenance and generation

All generated assets use the built-in image_gen tool. Source PNGs remain in the Codex generated_images folder. Optimized JPEG copies are bundled permanently in `dist/assets/`.

## Hero — hero.jpg

Prompt: “Use case: photorealistic-natural. Create one premium automotive editorial photograph for the full-width hero of a French private Cars & Coffee event website. Wide landscape 16:9. A deep forest green Porsche 911 GT3 seen in striking low front three-quarter view, parked on a pale gravel estate driveway, autumn trees with golden leaves, subtle early morning haze. A small out-of-focus burgundy vintage sports car in the distance. No building visible. The main car occupies the right two thirds and lower half, leaving dark softly shaded trees on upper left for white typography overlay. Exquisite true-to-life automotive proportions, authentic metallic paint, cinematic natural morning light, beautiful restrained film grain, very high-end luxury car magazine campaign, rich dark shadows, warm gold highlights, realistic camera photograph, no text, no typography, no watermark. The setting is illustrative, not a factual depiction of a named venue.”

## Four automobile categories

Each generated separately using this shared prompt:

“Use case: photorealistic-natural. Premium automotive editorial photograph for a private French Cars & Coffee landing page category '[category]'. [subject], parked on light gravel with a softly blurred autumn estate park behind. Wide 3:2 landscape photo, full vehicle comfortably inside the frame, no cropped wheels. Sophisticated restrained campaign photography, subtle warm early morning sunlight, rich deep shadows, authentic materials and mechanical details, desaturated green and warm gold environment, cinematic luxury, photographed with 85mm lens, no people, no signage, no text, no watermarks. This is an illustrative automobile, not a promise of event attendance.”

- `supercars.jpg`: category supercars; subject: A burgundy Ferrari 296 GTB, full car in front three-quarter view.
- `hypercars.jpg`: category hypercars; subject: A silver and exposed carbon Pagani Huayra, full car in front three-quarter view.
- `collection.jpg`: category collection; subject: A dark British racing green Jaguar E-Type series 1 coupe, full car in side three-quarter view.
- `sportives.jpg`: category sportives; subject: An ivory white Porsche 911 GT3, full car in front three-quarter view.

## Château — chateau.jpg and chateau-original.jpg

Source: Wolrfam, 10 August 2019, https://commons.wikimedia.org/wiki/File:Chateau_de_Prunay.jpg
Original download: https://upload.wikimedia.org/wikipedia/commons/b/b3/Chateau_de_Prunay.jpg
License: CC BY-SA 4.0, https://creativecommons.org/licenses/by-sa/4.0/
The derivative `chateau.jpg` is made available under the same license. Changes: generated autumn vegetation, morning light, sharpness, and some architectural details. It is visibly labelled as an artistic AI interpretation, with the original available in Credits.

Prompt with the original photo as reference/edit target:

“Use case: lighting-weather / identity-preserve. Reference image is an actual photo of Château de Prunay in Louveciennes by Wolrfam. Make a premium architectural editorial rendition of this EXACT photographed castle view. Preserve the visible building's architecture, turret, chimneys, windows, rooflines and perspective faithfully. Improve photographic sharpness and transform light into atmospheric golden autumn morning light with a few amber leaves among the green foliage, subtly misty background, balanced film photography color grade, rich dark foliage and beautiful warm pale stone. Keep the existing composition and foliage placement; no invented wings or buildings, no cars, no people, no text. Landscape 3:2. This will be labelled as an artistic AI interpretation based on a photograph, not an unedited documentary photo.”

## Organizer logos

- `automotive-specialist-logo.png`: user-supplied `logo hd.png`, resized to 800px for web use; displayed in a CSS circle without redrawing.
- `olivier-paris-supercars-logo.svg`: code-native editable vector adaptation based on the Olivier logo in the supplied event poster: car silhouette and three-line Olivier / Paris / Supercars wordmark.

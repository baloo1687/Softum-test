# Test task for Softum company

To see the finished project follow the link: https://baloo1687.github.io/Softum-test/dist/index.html

Buttons logic:
1. Add - adding one card (while "Add" work, is not possible to use Add, Fill, Clear logic), delay by default 3000ms;
2. Remove - removing one card from the end;
3. Fill - filling cards container while have empty space in viewport, and activate logic for adding card while scrolling, delay between adding card - 3000ms (while "Fill" work, is not possible to use Add, Fill, Clear logic);
4. Clear - clearing all cards except for first card, deactivating adding cards while scrolling;
5. Open modal - showing the modal where existing random text. (Random modal text is creating with random card title and card text);
6. Remove card - removing the current card.

Cards has min width and height, and can be changing depend inner content.

# npm run build

For dev build and starting local webserver

# npm run dev

For dev build without local webserver

# npm run prod

For production build

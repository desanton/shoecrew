-- Image Transform Updates

-- Shoe 2, 7: move down slightly
UPDATE "Product" SET "imageTransform" = '{"rotationDeg": -20, "scale": 1, "shiftX": 0, "shiftY": 20, "mirrorX": false}'::jsonb WHERE "id" = 'prod_2';
UPDATE "Product" SET "imageTransform" = '{"rotationDeg": -20, "scale": 1, "shiftX": 0, "shiftY": 20, "mirrorX": false}'::jsonb WHERE "id" = 'prod_7';

-- Shoe 1, 8: move left slightly + rotate 30 degrees clockwise
UPDATE "Product" SET "imageTransform" = '{"rotationDeg": 5, "scale": 1, "shiftX": -15, "shiftY": 0, "mirrorX": false}'::jsonb WHERE "id" = 'prod_1';
UPDATE "Product" SET "imageTransform" = '{"rotationDeg": 5, "scale": 1, "shiftX": -15, "shiftY": 0, "mirrorX": false}'::jsonb WHERE "id" = 'prod_8';

-- Shoe 3, 5: magnify by 1.25 + rotate 20 degrees clockwise
UPDATE "Product" SET "imageTransform" = '{"rotationDeg": 5, "scale": 1.35, "shiftX": 0, "shiftY": 0, "mirrorX": false}'::jsonb WHERE "id" = 'prod_3';
UPDATE "Product" SET "imageTransform" = '{"rotationDeg": 5, "scale": 1.35, "shiftX": 0, "shiftY": 0, "mirrorX": false}'::jsonb WHERE "id" = 'prod_5';

-- Shoe 4, 6: move down slightly + rotate 20 degrees clockwise
UPDATE "Product" SET "imageTransform" = '{"rotationDeg": 3, "scale": 1.25, "shiftX": 0, "shiftY": 10, "mirrorX": false}'::jsonb WHERE "id" = 'prod_4';
UPDATE "Product" SET "imageTransform" = '{"rotationDeg": 3, "scale": 1.25, "shiftX": 0, "shiftY": 10, "mirrorX": false}'::jsonb WHERE "id" = 'prod_6';

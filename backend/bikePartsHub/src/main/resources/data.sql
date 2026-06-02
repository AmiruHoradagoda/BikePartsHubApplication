-- Insert bikes
INSERT INTO bike (bike_id, type, model, version, manufacture) VALUES
                                                                  (1, 'Motorbike', 'FZ', 'Version 1', 'Yamaha'),
                                                                  (2, 'Motorbike', 'FZ', 'Version 2', 'Yamaha'),
                                                                  (3, 'Motorbike', 'FZ', 'Version 3', 'Yamaha');

-- Insert products
INSERT INTO product (product_id, product_name, product_type, quantity, category, manufacture, item_description, active_state, average_rating, price_per_unit, discount, material, part_number, image_url) VALUES
                                                                                                                                                                                                              (1, 'Chain kit SCO', 'PARTS', 10, 'Chain and Sprocket Kit', 'SCO', 'Chain and sprocket kit for durable performance and smooth ride transmission.', 1, 4.5, 40.0, 10.0, 'Rubber', 'MTB-TIRE-001', 'https://my-files-amiru.s3.us-east-1.amazonaws.com/bike-parts-hub/product-images/chain_kit_SCO.jpeg'),
                                                                                                                                                                                                              (2, 'Clutch Plate', 'PARTS', 30, 'Engine Parts', 'Yamaha', 'Yamaha clutch plate for smooth gear shifts and long-lasting durability.', 1, 4.7, 60.0, 5.0, 'Aluminum', 'RB-HANDLE-002', 'https://my-files-amiru.s3.us-east-1.amazonaws.com/bike-parts-hub/product-images/clutch_plate_.jpeg'),
                                                                                                                                                                                                              (3, 'Fz v3 Brake repair kit', 'PARTS', 20, 'Servise Kits', 'Yamaha', 'Yamaha repair kit with essential tools for quick and efficient repairs.', 1, 4.8, 200.0, 15.0, 'Lithium', 'EB-BATT-003', 'https://my-files-amiru.s3.us-east-1.amazonaws.com/bike-parts-hub/product-images/repair_kit.jpeg'),
                                                                                                                                                                                                              (4, 'Gear shaft', 'PARTS', 30, 'Engine Parts ', 'Yamaha', 'Yamaha gear shaft for optimal transmission and power transfer efficiency.', 1, 4.7, 60.0, 5.0, 'Aluminum', 'RB-HANDLE-002', 'https://my-files-amiru.s3.us-east-1.amazonaws.com/bike-parts-hub/product-images/gear_shaft.jpeg'),
                                                                                                                                                                                                              (5, 'Swingarmm kit.', 'PARTS', 30, 'Suspension', 'Yamaha', 'Yamaha swing arm kit for enhanced rear suspension performance.', 1, 4.7, 60.0, 5.0, 'Aluminum', 'RB-HANDLE-002', 'https://my-files-amiru.s3.us-east-1.amazonaws.com/bike-parts-hub/product-images/swing_armm_kit.jpeg'),
                                                                                                                                                                                                              (6, 'NGK Spark plug', 'PARTS', 30, 'Electronic Parts', 'NGK', 'NGK spark plug ensuring reliable engine ignition and performance.', 1, 4.7, 60.0, 5.0, 'Aluminum', 'RB-HANDLE-002', 'https://my-files-amiru.s3.us-east-1.amazonaws.com/bike-parts-hub/product-images/ngk_spark_plug.jpeg'),
                                                                                                                                                                                                              (7, 'Fz v2 Caliper front', 'PARTS', 30, 'Brake dics and pads', 'Yamaha', 'Yamaha V2 front brake caliper for improved braking precision and power.', 1, 4.7, 60.0, 5.0, 'Aluminum', 'RB-HANDLE-002', 'https://my-files-amiru.s3.us-east-1.amazonaws.com/bike-parts-hub/product-images/v2_Caliper_front.jpeg'),
                                                                                                                                                                                                              (8, 'Fz v3 Tank', 'PARTS', 30, 'Tank', 'Yamaha', 'Yamaha V3 tank offering high fuel capacity and durability.', 1, 4.7, 60.0, 5.0, 'Aluminum', 'RB-HANDLE-002', 'https://my-files-amiru.s3.us-east-1.amazonaws.com/bike-parts-hub/product-images/v3_tank.jpeg'),
                                                                                                                                                                                                              (9, 'Horn', 'PARTS', 30, 'Electronic Parts', 'Yamaha', 'Yamaha horn providing loud and clear sound for safety and alerting.', 1, 4.7, 60.0, 5.0, 'Aluminum', 'RB-HANDLE-002', 'https://my-files-amiru.s3.us-east-1.amazonaws.com/bike-parts-hub/product-images/horn.jpeg'),
                                                                                                                                                                                                              (10, 'Chain kit Clamp', 'PARTS', 30, 'Chain and Sprocket Kit', 'Clamp', 'Clamp chain and sprocket kit for optimized power transmission.', 1, 4.7, 60.0, 5.0, 'Aluminum', 'RB-HANDLE-002', 'https://my-files-amiru.s3.us-east-1.amazonaws.com/bike-parts-hub/product-images/chain_kit_clamp.jpeg'),
                                                                                                                                                                                                              (11, 'Start motor Lucus', 'PARTS', 30, 'Engine Parts', 'Lucus', 'Lucas engine start motor, ideal for quick ignition and long-lasting performance.', 1, 4.7, 60.0, 5.0, 'Aluminum', 'RB-HANDLE-002', 'https://my-files-amiru.s3.us-east-1.amazonaws.com/bike-parts-hub/product-images/Start_motor_Lucus.jpeg'),
                                                                                                                                                                                                              (12, 'Fz v1 v2 Brake shoes', 'PARTS', 30, 'Brake dics and pads', 'Yamaha', 'Yamaha  brake shoes providing reliable stopping power and durability.', 1, 4.7, 60.0, 5.0, 'Aluminum', 'RB-HANDLE-002', 'https://my-files-amiru.s3.us-east-1.amazonaws.com/bike-parts-hub/product-images/v2_v1_brake_shoes.jpeg'),
                                                                                                                                                                                                              (13, 'Coil Pack', 'PARTS', 30, 'Electronic Parts', 'Yamaha', 'Yamaha coil pack for reliable ignition and enhanced engine efficiency.', 1, 4.7, 60.0, 5.0, 'Aluminum', 'RB-HANDLE-002', 'https://my-files-amiru.s3.us-east-1.amazonaws.com/bike-parts-hub/product-images/coil_pack.jpeg'),

                                                                                                                                                                                                              (14, '20w 40 castrol', 'ENGINE_OIL', 6, '20W-40', 'CASTROL', 'High-performance Castrol 20W-40 engine oil, suitable for all bikes.', 1, 4.5, 549.0, 12.0, 'Liquid', 232323, 'https://my-files-amiru.s3.us-east-1.amazonaws.com/bike-parts-hub/product-images/20w_40_castrol.jpeg'),
                                                                                                                                                                                                              (15, '20w 40 ride', 'ENGINE_OIL', 1, '20W-40', 'RIDE', 'Premium Ride 20W-40 engine oil designed for smooth performance.', 1, 4.5, 352.0, 19.0, 'Liquid', 234243, 'https://my-files-amiru.s3.us-east-1.amazonaws.com/bike-parts-hub/product-images/20w_40_ride.jpeg'),
                                                                                                                                                                                                              (16, '20w 40 motul', 'ENGINE_OIL', 6, '20W-40', 'MOTUL', 'Motul 20W-40 engine oil with advanced protection.', 1, 4.5, 477.0, 20.0, 'Liquid', 67466, 'https://my-files-amiru.s3.us-east-1.amazonaws.com/bike-parts-hub/product-images/20w_49_motul.jpeg'),
                                                                                                                                                                                                              (17, '20w 50 servo', 'ENGINE_OIL', 3, '20W-50', 'SERVO', 'Servo 20W-50 engine oil for enhanced engine longevity.', 1, 4.5, 114.0, 15.0, 'Liquid',243684, 'https://my-files-amiru.s3.us-east-1.amazonaws.com/bike-parts-hub/product-images/20w_50_servo.jpeg'),
                                                                                                                                                                                                              (18, 'V3-left tank cover-black', 'BODY_PARTS', 6, 'Frame and Body', 'YAMAHA', 'High-performance Castrol 20W-40 engine oil, suitable for all bikes.', 1, 4.5, 549.0, 12.0, 'Metal', 424242, 'https://my-files-amiru.s3.us-east-1.amazonaws.com/bike-parts-hub/product-images/V3-left_tank_cover-black.jpg'),
                                                                                                                                                                                                              (19, 'fork tube endurance', 'BODY_PARTS', 6, 'Suspension', 'ENDURANCE', 'Endurance fork tube for strong and reliable suspension components.', 1, 4.5, 549.0, 12.0, 'Metal',4327273, 'https://my-files-amiru.s3.us-east-1.amazonaws.com/bike-parts-hub/product-images/fork_tube_endurance.jpeg'),
                                                                                                                                                                                                              (20, 'v2 side mirror', 'BODY_PARTS', 6, 'Frame and Body', 'YAMAHA', 'Yamaha V2 side mirror providing clear rear visibility for safer rides.', 1, 4.5, 549.0, 12.0, 'Metal', 23423, 'https://my-files-amiru.s3.us-east-1.amazonaws.com/bike-parts-hub/product-images/v2_side_mirror.jpeg'),
                                                                                                                                                                                                              (21, 'V3-left tank cover-black', 'BODY_PARTS', 6, 'Frame and Body', 'YAMAHA', 'High-performance Castrol 20W-40 engine oil, suitable for all bikes.', 1, 4.5, 549.0, 12.0, 'Metal', 424242, 'https://my-files-amiru.s3.us-east-1.amazonaws.com/bike-parts-hub/product-images/V3-left_tank_cover-black.jpg');





-- Insert product attributes for Mountain Bike Tire (bike_id = 1, product_id = 1)
INSERT INTO product_attribute (product_attribute_id, color, product_id, bike_id) VALUES
                                                                                     (1, 'Black', 1, 1),
                                                                                     (2, 'Black', 1, 3),
                                                                                     (3, 'Black', 2, 1),
                                                                                     (4, 'Black', 2, 2),
                                                                                     (5, 'Black', 3, 1),
                                                                                     (6, 'Black', 3, 3),
                                                                                     (7, 'Black', 4, 1),
                                                                                     (8, 'Black', 4, 2),
                                                                                     (9, 'Black', 5, 1),
                                                                                     (10, 'Black', 5, 3),
                                                                                     (11, 'Black', 6, 1),
                                                                                     (12, 'Black', 6, 2),
                                                                                     (13, 'Black', 7, 1),
                                                                                     (14, 'Black', 7, 3),
                                                                                     (15, 'Black', 8, 1),
                                                                                     (16, 'Black', 8, 2),
                                                                                     (17, 'Black', 9, 2),
                                                                                     (18, 'Black', 9, 1),
                                                                                     (19, 'Black', 10, 2),
                                                                                     (20, 'Black', 10, 1),
                                                                                     (21, 'Black', 11, 3),
                                                                                     (22, 'Black', 11, 1),
                                                                                     (23, 'Black', 12, 1),
                                                                                     (24, 'Black', 12, 2),
                                                                                     (25, 'Black', 13, 1),
                                                                                     (26, 'Black', 13, 2),
                                                                                     (27, 'Black', 14, 1),
                                                                                     (28, 'Black', 14, 2),
                                                                                     (29, 'Black', 15, 1),
                                                                                     (30, 'Black', 15, 2),
                                                                                     (31, 'Black', 16, 1),
                                                                                     (32, 'Black', 16, 2),
                                                                                     (33, 'Black', 17, 1),
                                                                                     (34, 'Black', 17, 2),
                                                                                     (35, 'Black', 18, 1),
                                                                                     (36, 'Black', 18, 2),
                                                                                     (37, 'Black', 19, 2),
                                                                                     (38, 'Black', 19, 1),
                                                                                     (39, 'Black', 20, 2),
                                                                                     (40, 'Black', 20, 1),
                                                                                     (41, 'Black', 21, 2),
                                                                                     (42, 'Black', 21, 1);

-- Insert main service types
INSERT INTO service_type (service_name, service_duration, service_cost, description) VALUES
                                                                                         ('Basic Service', 2, 999.00, 'Basic cleaning service with essential housekeeping tasks'),
                                                                                         ('Standard Service', 4, 1999.00, 'Standard cleaning with additional deep cleaning services'),
                                                                                         ('Premium Service', 8, 3999.00, 'Premium service with comprehensive cleaning solutions');

-- Insert features for Basic Service
INSERT INTO service_type_features (service_type_id, features) VALUES
                                                                  (1, 'Oil Change'),
                                                                  (1, 'Engine Check'),
                                                                  (1, 'Basic Inspection'),
                                                                  (1, 'Filter Cleaning'),
                                                                  (1, 'Basic Tuning');

-- Insert features for Standard Service
INSERT INTO service_type_features (service_type_id, features) VALUES
                                                                  (2, 'Everything in Basic'),
                                                                  (2, 'Deep Engine Cleaning'),
                                                                  (2, 'Brake Service'),
                                                                  (2, 'Chain Lubrication'),
                                                                  (2, 'Tire Pressure Check'),
                                                                  (2, 'Battery Check');

-- Insert features for Premium Service
INSERT INTO service_type_features (service_type_id, features) VALUES
                                                                  (3, 'Everything in Standard'),
                                                                  (3, 'Full Engine Service'),
                                                                  (3, 'Complete Diagnostics'),
                                                                  (3, 'Spark Plug Replacement'),
                                                                  (3, 'Carburetor Cleaning'),
                                                                  (3, 'Performance Tuning'),
                                                                  (3, 'Detailed Inspection');
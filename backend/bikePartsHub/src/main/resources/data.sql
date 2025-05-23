-- Insert bikes
INSERT INTO bike (bike_id, type, model, version, manufacture) VALUES
                                                                  (1, 'Motorbike', 'FZ', 'Version 1', 'Yamaha'),
                                                                  (2, 'Motorbike', 'FZ', 'Version 2', 'Yamaha'),
                                                                  (3, 'Motorbike', 'FZ', 'Version 3', 'Yamaha');

-- Insert products
INSERT INTO product (product_id, product_name, product_type, quantity, category, manufacture, item_description, active_state, average_rating, price_per_unit, discount, material, part_number, image_url) VALUES
                                                                                                                                                                                                              (1, 'Chain kit SCO', 'PARTS', 10, 'Chain and Sprocket Kit', 'SCO', 'Chain and sprocket kit for durable performance and smooth ride transmission.', 1, 4.5, 40.0, 10.0, 'Rubber', 'MTB-TIRE-001', 'https://firebasestorage.googleapis.com/v0/b/bikepartshubapp.appspot.com/o/chain%20kit%20SCO.jpeg?alt=media&token=5fa3ea2b-bc0b-49de-a7f1-ef3d9e447138'),
                                                                                                                                                                                                              (2, 'Clutch Plate', 'PARTS', 30, 'Engine Parts', 'Yamaha', 'Yamaha clutch plate for smooth gear shifts and long-lasting durability.', 1, 4.7, 60.0, 5.0, 'Aluminum', 'RB-HANDLE-002', 'https://firebasestorage.googleapis.com/v0/b/bikepartshubapp.appspot.com/o/clutch%20plate%20.jpeg?alt=media&token=4fb44638-5a88-4be1-8930-66bd27d287ad'),
                                                                                                                                                                                                              (3, 'Fz v3 Brake repair kit', 'PARTS', 20, 'Servise Kits', 'Yamaha', 'Yamaha repair kit with essential tools for quick and efficient repairs.', 1, 4.8, 200.0, 15.0, 'Lithium', 'EB-BATT-003', 'https://firebasestorage.googleapis.com/v0/b/bikepartshubapp.appspot.com/o/repair%20kit.jpeg?alt=media&token=7fffcbef-1dbe-4ab1-8c04-3f7e382addac'),
                                                                                                                                                                                                              (4, 'Gear shaft', 'PARTS', 30, 'Engine Parts ', 'Yamaha', 'Yamaha gear shaft for optimal transmission and power transfer efficiency.', 1, 4.7, 60.0, 5.0, 'Aluminum', 'RB-HANDLE-002', 'https://firebasestorage.googleapis.com/v0/b/bikepartshubapp.appspot.com/o/gear%20shaft.jpeg?alt=media&token=376152c3-6089-4b22-9b46-752c6b411741'),
                                                                                                                                                                                                              (5, 'Swingarmm kit.', 'PARTS', 30, 'Suspension', 'Yamaha', 'Yamaha swing arm kit for enhanced rear suspension performance.', 1, 4.7, 60.0, 5.0, 'Aluminum', 'RB-HANDLE-002', 'https://firebasestorage.googleapis.com/v0/b/bikepartshubapp.appspot.com/o/swing%20armm%20kit.jpeg?alt=media&token=4e074830-037b-4967-9aa1-efb38ee3e434'),
                                                                                                                                                                                                              (6, 'NGK Spark plug', 'PARTS', 30, 'Electronic Parts', 'NGK', 'NGK spark plug ensuring reliable engine ignition and performance.', 1, 4.7, 60.0, 5.0, 'Aluminum', 'RB-HANDLE-002', 'https://firebasestorage.googleapis.com/v0/b/bikepartshubapp.appspot.com/o/ngk_spark_plug.jpeg?alt=media&token=8c2fb280-2bbd-4e10-9380-a2c8c7877cdc'),
                                                                                                                                                                                                              (7, 'Fz v2 Caliper front', 'PARTS', 30, 'Brake dics and pads', 'Yamaha', 'Yamaha V2 front brake caliper for improved braking precision and power.', 1, 4.7, 60.0, 5.0, 'Aluminum', 'RB-HANDLE-002', 'https://firebasestorage.googleapis.com/v0/b/bikepartshubapp.appspot.com/o/v2_Caliper_front.jpeg?alt=media&token=c7ad17e0-b081-46b1-8b98-29352e043713'),
                                                                                                                                                                                                              (8, 'Fz v3 Tank', 'PARTS', 30, 'Tank', 'Yamaha', 'Yamaha V3 tank offering high fuel capacity and durability.', 1, 4.7, 60.0, 5.0, 'Aluminum', 'RB-HANDLE-002', 'https://firebasestorage.googleapis.com/v0/b/bikepartshubapp.appspot.com/o/v3_tank.jpeg?alt=media&token=102e82a8-2af9-4e2a-af96-dfce26626512'),
                                                                                                                                                                                                              (9, 'Horn', 'PARTS', 30, 'Electronic Parts', 'Yamaha', 'Yamaha horn providing loud and clear sound for safety and alerting.', 1, 4.7, 60.0, 5.0, 'Aluminum', 'RB-HANDLE-002', 'https://firebasestorage.googleapis.com/v0/b/bikepartshubapp.appspot.com/o/horn.jpeg?alt=media&token=43d36da4-6e3c-4779-84aa-1e7b049f4b0a'),
                                                                                                                                                                                                              (10, 'Chain kit Clamp', 'PARTS', 30, 'Chain and Sprocket Kit', 'Clamp', 'Clamp chain and sprocket kit for optimized power transmission.', 1, 4.7, 60.0, 5.0, 'Aluminum', 'RB-HANDLE-002', 'https://firebasestorage.googleapis.com/v0/b/bikepartshubapp.appspot.com/o/chain%20kit%20clamp.jpeg?alt=media&token=c3af1820-3c91-4e0d-abbd-a16be8364043'),
                                                                                                                                                                                                              (11, 'Start motor Lucus', 'PARTS', 30, 'Engine Parts', 'Lucus', 'Lucas engine start motor, ideal for quick ignition and long-lasting performance.', 1, 4.7, 60.0, 5.0, 'Aluminum', 'RB-HANDLE-002', 'https://firebasestorage.googleapis.com/v0/b/bikepartshubapp.appspot.com/o/Start_motor_Lucus.jpeg?alt=media&token=a0cc50d7-c00d-42b5-8d84-b901001604d5'),
                                                                                                                                                                                                              (12, 'Fz v1 v2 Brake shoes', 'PARTS', 30, 'Brake dics and pads', 'Yamaha', 'Yamaha  brake shoes providing reliable stopping power and durability.', 1, 4.7, 60.0, 5.0, 'Aluminum', 'RB-HANDLE-002', 'https://firebasestorage.googleapis.com/v0/b/bikepartshubapp.appspot.com/o/v2_v1_brake_shoes.jpeg?alt=media&token=f79f6bc8-7da0-41ef-aeb9-5fe2f248d882'),
                                                                                                                                                                                                              (13, 'Coil Pack', 'PARTS', 30, 'Electronic Parts', 'Yamaha', 'Yamaha coil pack for reliable ignition and enhanced engine efficiency.', 1, 4.7, 60.0, 5.0, 'Aluminum', 'RB-HANDLE-002', 'https://firebasestorage.googleapis.com/v0/b/bikepartshubapp.appspot.com/o/coil%20pack.jpeg?alt=media&token=f4613d61-64cf-4b23-ac25-02f22dbea17f'),

                                                                                                                                                                                                              (14, '20w 40 castrol', 'ENGINE_OIL', 6, '20W-40', 'CASTROL', 'High-performance Castrol 20W-40 engine oil, suitable for all bikes.', 1, 4.5, 549.0, 12.0, 'Liquid', 232323, 'https://firebasestorage.googleapis.com/v0/b/bikepartshubapp.appspot.com/o/20w%2040%20castrol.jpeg?alt=media&token=3031c4a2-7ead-4951-9188-6edbee01e56a'),
                                                                                                                                                                                                              (15, '20w 40 ride', 'ENGINE_OIL', 1, '20W-40', 'RIDE', 'Premium Ride 20W-40 engine oil designed for smooth performance.', 1, 4.5, 352.0, 19.0, 'Liquid', 234243, 'https://firebasestorage.googleapis.com/v0/b/bikepartshubapp.appspot.com/o/20w%2040%20ride.jpeg?alt=media&token=2c5e27f2-2ce9-463c-92db-fedc507c2c9a'),
                                                                                                                                                                                                              (16, '20w 40 motul', 'ENGINE_OIL', 6, '20W-40', 'MOTUL', 'Motul 20W-40 engine oil with advanced protection.', 1, 4.5, 477.0, 20.0, 'Liquid', 67466, 'https://firebasestorage.googleapis.com/v0/b/bikepartshubapp.appspot.com/o/20w%2049%20motul.jpeg?alt=media&token=f2a8f155-8d1c-48f6-8d6f-2872a50714ee'),
                                                                                                                                                                                                              (17, '20w 50 servo', 'ENGINE_OIL', 3, '20W-50', 'SERVO', 'Servo 20W-50 engine oil for enhanced engine longevity.', 1, 4.5, 114.0, 15.0, 'Liquid',243684, 'https://firebasestorage.googleapis.com/v0/b/bikepartshubapp.appspot.com/o/20w%2050%20servo.jpeg?alt=media&token=4d80efda-55df-47f8-96f7-377e1a2b1768'),
                                                                                                                                                                                                              (18, 'V3-left tank cover-black', 'BODY_PARTS', 6, 'Frame and Body', 'YAMAHA', 'High-performance Castrol 20W-40 engine oil, suitable for all bikes.', 1, 4.5, 549.0, 12.0, 'Metal', 424242, 'https://firebasestorage.googleapis.com/v0/b/bikepartshubapp.appspot.com/o/V3-left%20tank%20cover-black.jpg?alt=media&token=888c751c-2e1c-47ec-828a-00c83c7b8511'),
                                                                                                                                                                                                              (19, 'fork tube endurance', 'BODY_PARTS', 6, 'Suspension', 'ENDURANCE', 'Endurance fork tube for strong and reliable suspension components.', 1, 4.5, 549.0, 12.0, 'Metal',4327273, 'https://firebasestorage.googleapis.com/v0/b/bikepartshubapp.appspot.com/o/fork%20tube%20endurance.jpeg?alt=media&token=771db9c0-5e3c-4822-b5df-bd887df045cd'),
                                                                                                                                                                                                              (20, 'v2 side mirror', 'BODY_PARTS', 6, 'Frame and Body', 'YAMAHA', 'Yamaha V2 side mirror providing clear rear visibility for safer rides.', 1, 4.5, 549.0, 12.0, 'Metal', 23423, 'https://firebasestorage.googleapis.com/v0/b/bikepartshubapp.appspot.com/o/v2%20side%20mirror.jpeg?alt=media&token=f00e8ffd-7ba6-4ee2-a2f0-d759a5ce22d8'),
                                                                                                                                                                                                              (21, 'V3-left tank cover-black', 'BODY_PARTS', 6, 'Frame and Body', 'YAMAHA', 'High-performance Castrol 20W-40 engine oil, suitable for all bikes.', 1, 4.5, 549.0, 12.0, 'Metal', 424242, 'https://firebasestorage.googleapis.com/v0/b/bikepartshubapp.appspot.com/o/V3-left%20tank%20cover-black.jpg?alt=media&token=888c751c-2e1c-47ec-828a-00c83c7b8511');



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
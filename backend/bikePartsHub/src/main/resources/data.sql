# -- Insert bikes
# INSERT INTO bike (bike_id, type, model, version, manufacture) VALUES
#                                                                   (1, 'Mountain', 'X-Trail', '2024', 'BikeCo'),
#                                                                   (2, 'Road', 'Speedster', '2023', 'SpeedPro'),
#                                                                   (3, 'Electric', 'EcoRide', '2025', 'ElectroWheels');
#
# -- Insert products
# INSERT INTO product (product_id, product_name, product_type, quantity, category, manufacture, item_description, active_state, average_rating, price_per_unit, discount, material, part_number, image_url) VALUES
#                                                                                                                                                                                                               (1, 'Mountain Bike Tire', 'Tire', 50, 'Accessories', 'TireCo', 'Durable tire for off-road bikes', 1, 4.5, 40.0, 10.0, 'Rubber', 'MTB-TIRE-001', 'https://example.com/tire1.jpg'),
#                                                                                                                                                                                                               (2, 'Road Bike Handlebar', 'Handlebar', 30, 'Accessories', 'HandleCo', 'Lightweight handlebar for road bikes', 1, 4.7, 60.0, 5.0, 'Aluminum', 'RB-HANDLE-002', 'https://example.com/handlebar1.jpg'),
#                                                                                                                                                                                                               (3, 'Electric Bike Battery', 'Battery', 20, 'Battery', 'BatteryCo', 'Long-lasting battery for electric bikes', 1, 4.8, 200.0, 15.0, 'Lithium', 'EB-BATT-003', 'https://example.com/battery1.jpg');
#
# -- Insert product attributes for Mountain Bike Tire (bike_id = 1, product_id = 1)
# INSERT INTO product_attribute (product_attribute_id, color, product_id, bike_id) VALUES
#                                                                                      (1, 'Black', 1, 1),
#                                                                                      (2, 'Black', 1, 2),
#                                                                                      (3, 'Red', 2, 2);
#
# -- Insert product attributes for Road Bike Handlebar (bike_id = 2, product_id = 2)
# INSERT INTO product_attribute (product_attribute_id, color, product_id, bike_id) VALUES
#                                                                                      (4, 'Silver', 2, 2),
#                                                                                      (5, 'Black', 2, 1);
#
# -- Insert product attributes for Electric Bike Battery (bike_id = 3, product_id = 3)
# INSERT INTO product_attribute (product_attribute_id, color, product_id, bike_id) VALUES
#     (6, 'Blue', 3, 3);

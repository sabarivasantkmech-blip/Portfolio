insert into projects (id, title, category, year, description, tags, gallery_id, article_id, sort_order)
values
  (
    'smart-campus-dashboard',
    'Smart Campus Dashboard',
    'Software',
    '2026',
    'A dashboard concept for tracking attendance, notices, tasks, and campus updates in one clean student workflow.',
    array['Web App', 'UI', 'Data'],
    'dashboard-wireframes',
    'dashboard-case-study',
    1
  ),
  (
    'iot-energy-monitor',
    'IoT Energy Monitor',
    'Engineering',
    '2026',
    'A prototype idea for reading sensor values, visualizing power usage, and identifying simple efficiency improvements.',
    array['IoT', 'Sensors', 'Prototype'],
    'iot-prototype',
    'iot-build-notes',
    2
  )
on conflict (id) do nothing;

insert into gallery_items (id, title, category, placeholder, description, sort_order)
values
  ('dashboard-wireframes', 'Dashboard Screens', 'Project Gallery', 'Add screenshot', 'Host slot for campus dashboard screens, user flows, or interface mockups.', 1),
  ('iot-prototype', 'IoT Prototype', 'Engineering Gallery', 'Add prototype photo', 'Host slot for circuit photos, sensor setup, readings, and demo images.', 2),
  ('photo-walks', 'Photo Walks', 'Hobby Gallery', 'Add photos', 'Host slot for reading corners, campus frames, street photos, and travel details.', 3)
on conflict (id) do nothing;

insert into articles (id, title, category, read_time, description, tags, sort_order)
values
  (
    'dashboard-case-study',
    'Designing a Smart Campus Dashboard',
    'Project Article',
    '4 min read',
    'Placeholder for the problem statement, user needs, dashboard layout, and implementation notes.',
    array['Case Study', 'UI', 'Data'],
    1
  ),
  (
    'iot-build-notes',
    'Notes From an IoT Energy Monitor',
    'Technical Article',
    '5 min read',
    'Placeholder for components used, sensor readings, diagrams, observations, and next improvements.',
    array['IoT', 'Prototype', 'Testing'],
    2
  )
on conflict (id) do nothing;

\c chit_chat_app;

INSERT INTO users (
    id, first_name, last_name, username, password, email, phone_number,
    sex_at_birth, gender_identity, date_of_birth
) VALUES
    ('8ca0fd8D-fd03-438c-8330-c6c4e7ef4aa9','John', 'Doe', 'johndoe', '$2b$10$H97GWe.izW3DSfFeKvhHNOB70eIqjs/.694M0v7hry7.HLXdYHumu', 'johndoe@example.com', '123-456-7890', 'Male', 'Man', '1990-05-15'),
    ('8ca0DD8D-fd03-438c-8330-c6c4e7ef4aa9','Jane', 'Doe', 'janedoe', '$2b$10$9SAkIM76nVMsXCzItK0riuYl8vjytCJvw0yunH73Cn.tjrt4DlE7.', 'janedoe@example.com', '646-123-3224', 'Female', 'Woman', '1988-11-23'),
    ('8ca0fd8D-fd33-438c-8330-c6c4e7ef4aa9','Bobby', 'Slither', 'bobbyslithers', '$2b$10$DFPZwxEHcVKgHqtK6MyJGOFMdTTB/p3IUDXXtBLAYmtniHJuPl3Zu', 'bobby99@example.com', '902-412-5213', 'Male', 'Non-binary', '1999-02-02'),
    ('8ca0fd8D-fd03-438c-8200-c6c4e7ef4aa9','Alice', 'White', 'alice_w', '$2b$10$pr8pC3.p/rRmAjhsk9qldOBG.DEUWjMO3AD0sXwqwJKcjVZNO6kT6', 'alicew@example.com', '678-665-3423', 'Female', 'Woman', '1995-07-10'),
    ('8ca0fd8D-fd03-438c-8330-c64Ce7ef4aa9','Mike', 'Franks', 'mike88', '$2b$10$5Oy1sMJqtNMXVnoBR.ZxQuzb/IQtoUoWvCy7XPz5ciuMi9.Xbtozu', 'mike88@example.com', '796-322-4142', 'Male', 'Man', '1985-12-30');


INSERT INTO podcast_entries (title, description, audio_url, user_id)
VALUES
    ('The Daily Byte', 'Tech news and deep dives.', 'https://example.com/audio/dailybyte.mp3','8ca0fd8D-fd03-438c-8330-c6c4e7ef4aa9'),
    ('Mindful Minutes', 'Short guided meditations for busy people.', 'https://example.com/audio/mindful.mp3', '8ca0DD8D-fd03-438c-8330-c6c4e7ef4aa9'),
    ('SlitherCast', 'Gaming reviews and weird facts.', 'https://example.com/audio/slither.mp3', '8ca0fd8D-fd33-438c-8330-c6c4e7ef4aa9'),
    ('White Noise', 'Late-night thoughts and music.', 'https://example.com/audio/whitenoise.mp3', '8ca0fd8D-fd03-438c-8200-c6c4e7ef4aa9'),
    ('Franks Talks', 'Honest conversations about finance.', 'https://example.com/audio/franks.mp3', '8ca0fd8D-fd03-438c-8200-c6c4e7ef4aa9'),
    ('Code & Coffee', 'Dev talk over caffeine.', 'https://example.com/audio/codecoffee.mp3', '8ca0fd8D-fd03-438c-8330-c64Ce7ef4aa9');

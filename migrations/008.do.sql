CREATE FUNCTION img_update_function()
RETURNS TRIGGER AS $$
BEGIN
  IF LENGTH(NEW.image) = 0 THEN
    NEW.image = OLD.image;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER img_update_trigger
BEFORE UPDATE ON recipes
FOR EACH ROW 
EXECUTE FUNCTION img_update_function();

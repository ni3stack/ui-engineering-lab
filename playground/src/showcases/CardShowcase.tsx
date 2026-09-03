import { 
  Button, 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader,
  CardTitle 
} from "@ui-lab/ui";

import userImage from "../../assets/user.png";

export function CardShowcase() {
  return (
    <div className="showcase">
      <header className="showcase-header">
        <h2>Card</h2>
        <p className="showcase-description">
            A flexible container for grouping related content, media, and actions.
        </p>
      </header>
      <section className="showcase-section">
        <div className="showcase-grid">
          {/* Basic Card */}
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account preferences.
              </CardDescription>
            </CardHeader>
            <CardContent>
                Update your profile, notifications, and privacy settings.
            </CardContent>
            <CardFooter>
              <Button>Save</Button>
            </CardFooter>
          </Card>
          {/* Profile Card */}
          <Card>
            <CardHeader>
              <div className="showcase-profile">
                <img
                  src={userImage}
                  alt="Profile"
                  className="showcase-avatar"
                />
                <div>
                  <CardTitle>Nitin Pathak</CardTitle>
                  <CardDescription>
                     User Experience
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              Designing simple and accessible experiences for the web.
            </CardContent>

            <CardFooter>
              <Button>View profile</Button>
            </CardFooter>
          </Card>
           {/* Image Card */}
          <Card>
            <img
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
              alt="Mountain landscape"
              className="showcase-card-image"
            />

            <CardHeader>
              <CardTitle>Explore the Mountains</CardTitle>
              <CardDescription>
                Discover beautiful places around the world.
              </CardDescription>
            </CardHeader>

            <CardFooter>
              <Button>Explore</Button>
            </CardFooter>
          </Card>

          {/* Product Card */}
          <Card>
            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
              alt="Wrist watch"
              className="showcase-card-image"
            />

            <CardHeader>
              <CardTitle>Classic Watch</CardTitle>
              <CardDescription>
                Minimal design with a premium finish.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <strong>$149</strong>
            </CardContent>

            <CardFooter>
              <Button>Add to cart</Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  );
}
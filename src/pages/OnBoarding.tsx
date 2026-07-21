// Components
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

// Icons
import { Bookmark, ChevronRight, ImagePlus, PencilLine } from "lucide-react";

// Helper Functions
import { getCurrentUser } from "./../components/custom/Profile/crud/profileStorage";
import { getNames } from "country-list";

export function SelectBox({ items }: { items: string[] }) {
  return (
    <Select>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((item) => (
            <SelectItem value={item}>{item}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

function OnBoarding() {
  const userData = getCurrentUser();
  const allCountries = getNames();

  return (
    <main className="p-12">
      <div className="max-w-[800px] mx-auto grid gap-12">
        <div className="heading">
          <button
            className="skip-btn xl:absolute top-19 right-12 z-(--z-dropdown) w-fit py-4 xl:p-4 flex items-center justify-center text-primary text-lg font-semibold transition hover:text-primary-hover"
            title="Skip for now"
          >
            Skip Now <ChevronRight />
          </button>
          <h1>Complete Your Professional Profile</h1>
          <p className="text-normal mt-4">
            Add your skills, experience, and career goals to unlock personalized
            opportunities and start applying for jobs.
          </p>
        </div>

        <div className="grid gap-4">
          <div className="box">
            <h3>Information About you</h3>
            <div className="bg-card mt-4 p-6 rounded-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="upload-profile">
                  <label
                    htmlFor="profile-image"
                    className="cursor-pointer text-normal bg-input w-16 h-16 rounded-full flex items-center justify-center relative"
                  >
                    <ImagePlus size={50} />
                    <span className="bg-input w-8 h-8 border border-muted rounded-full flex items-center justify-center absolute top-8 left-8">
                      <PencilLine size={16} />
                    </span>
                  </label>
                  <input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    hidden
                  />
                </div>
                <div>
                  <h5>{userData?.fullName}</h5>
                  <div className="flex items-center gap-4 mt-2 text-sm text-normal">
                    <span>{userData?.phone}</span>
                    <span>{userData?.email}</span>
                  </div>
                </div>
              </div>

              <div className="inputs grid grid-cols-2 gap-8">
                <div className="field">
                  <h6 className="mb-2">Country</h6>
                  <Input />
                </div>
                <div className="field">
                  <h6 className="mb-2">Field</h6>
                  <SelectBox items={allCountries} />
                </div>
              </div>
            </div>
          </div>

          <div className="box">
            <h3>Professional Information</h3>
            <div className="bg-card mt-4 p-6 rounded-lg">
              <div className="inputs grid grid-cols-2 gap-8">
                <div className="field">
                  <h6 className="mb-2">Current Job Title</h6>
                  <Input />
                </div>
                <div className="field">
                  <h6 className="mb-2">Years Of Experience</h6>
                  <Input />
                </div>
                <div className="field">
                  <h6 className="mb-2">Company</h6>
                  <Input />
                </div>
                <div className="field">
                  <h6 className="mb-2">Employment Status</h6>
                  <SelectBox items={["Student", "Trainee", "Employeed", "UnEmployeed"]} />
                </div>
              </div>
            </div>
          </div>

          <div className="box">
            <h3>Interested</h3>
            <div className="bg-card mt-4 p-6 rounded-lg">
              <div className="inputs grid grid-cols-2 gap-8">
                <div className="field">
                  <h6 className="mb-2">What are you interested in</h6>
                  <Input />
                </div>
                <div className="field">
                  <h6 className="mb-2">Prefered Work Settings</h6>
                  <Input />
                </div>
              </div>
            </div>
          </div>

          <div className="box">
            <h3>Education</h3>
            <div className="bg-card mt-4 p-6 rounded-lg">
              <div className="inputs grid grid-cols-2 gap-8">
                <div className="field">
                  <h6 className="mb-2">University</h6>
                  <Input />
                </div>
                <div className="field">
                  <h6 className="mb-2">Years Of Education</h6>
                  <Input />
                </div>
              </div>
            </div>
          </div>

          <div className="box">
            <h3>Experience</h3>
            <div className="bg-card mt-4 p-6 rounded-lg"></div>
          </div>

          <div className="box">
            <h3>Skills</h3>
            <div className="bg-card mt-4 p-6 rounded-lg"></div>
          </div>

          <div className="box">
            <h3>Resume</h3>
            <div className="bg-card mt-4 p-6 rounded-lg"></div>
          </div>

          <div className="box">
            <h3>Add URL</h3>
            <div className="bg-card mt-4 p-6 rounded-lg"></div>
          </div>
        </div>

        <Button className="h-14 rounded-sm text-lg text-white">
          Save <Bookmark fill="#fff" />
        </Button>
      </div>
    </main>
  );
}

export default OnBoarding;

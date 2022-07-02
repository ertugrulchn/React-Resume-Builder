import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import "./ResumeBuilder.css";
import { toPng } from "html-to-image";
import Pdf from "react-to-pdf";
import { format } from "date-fns";
import SKILLI from "../interfaces/SkillIntarface";

function ResumeBuilder() {
  const [firstName, setFirstName] = useState<string>("Your Name");
  const [lastName, setLastName] = useState<string>("");
  const [profession, setProfession] = useState<string>("Profession");
  const [city, setCity] = useState<string>("City");
  const [country, setCountry] = useState<string>("Country");
  const [postalCode, setPostalCode] = useState<string>("Postal Code");
  const [phone, setPhone] = useState<string>("Phone");
  const [email, setEmail] = useState<string>("Email");
  const [about, setAbout] = useState<string>("About");
  const [skills, setSkills] = useState<SKILLI[]>([]);

  const steps: any[] = [{ label: "" }, { label: "" }, { label: "" }];
  const { nextStep, prevStep, reset, activeStep }: any = useSteps({
    initialStep: 0,
  });

  const ref = useRef<HTMLDivElement>(null);
  const toast = useToast();

  const getFileName = (fileType: string) =>
    `${format(new Date(), "'CV-'HH-mm-ss")}.${fileType}`;

  const downloadPng = useCallback(() => {
    if (ref.current === null) {
      return;
    }
    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `${getFileName("png")}`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
    toast({
      title: "File Downloading",
      description:
        "The CV you have prepared is being downloaded. We are waiting for you again :)",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  }, [ref]);

  const onChangeFN = (e: any) => {
    setFirstName(e.target.value);
  };

  const onChangeLN = (e: any) => {
    setLastName(e.target.value);
  };

  const onChangeP = (e: any) => {
    setProfession(e.target.value);
  };

  const onChangeCi = (e: any) => {
    setCity(e.target.value);
  };

  const onChangeCo = (e: any) => {
    setCountry(e.target.value);
  };

  const onChangePC = (e: any) => {
    setPostalCode(e.target.value);
  };

  const onChangePh = (e: any) => {
    setPhone(e.target.value);
  };

  const onChangeE = (e: any) => {
    setEmail(e.target.value);
  };

  const onChangeAb = (e: any) => {
    setAbout(e.target.value);
  };

  const handleKeyDown = (e: any) => {
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;
    addSkill(value);
    e.target.value = "";
  };

  // SKILL PROCESS
  const addSkill = (title: any) => {
    const data: SKILLI = {
      id: skills.length > 0 ? skills[skills.length - 1].id + 1 : 1,
      title: title,
    };
    setSkills((prevSkill) => [...prevSkill, data]);
  };

  const deleteSkill = (id: number) => {
    const deleteSkills: SKILLI[] = skills.filter(
      (skill: SKILLI): any => skill.id !== id
    );

    setSkills(deleteSkills);
  };

  return (
    <div style={{ margin: 30 }}>
      <Flex flexDir="column" width="100%">
        <Steps activeStep={activeStep}>
          <Step label="User Information">
            <Grid templateColumns="repeat(2, 1fr)" gap={10} marginBottom={8}>
              <GridItem w="100%">
                <FormControl>
                  <FormLabel htmlFor="first-name" fontSize={12}>
                    First Name
                  </FormLabel>
                  <Input
                    id="first-name"
                    type="text"
                    placeholder="e.g. Ertuğrul Emre"
                    borderRadius={0}
                    onChange={(c) => onChangeFN(c)}
                  />
                </FormControl>
              </GridItem>
              <GridItem w="100%">
                <FormControl>
                  <FormLabel htmlFor="last-name" fontSize={12}>
                    Last Name
                  </FormLabel>
                  <Input
                    id="last-name"
                    type="text"
                    placeholder="e.g. Cihan"
                    borderRadius={0}
                    onChange={(c) => onChangeLN(c)}
                  />
                </FormControl>
              </GridItem>
            </Grid>
            <FormControl marginBottom={8}>
              <FormLabel htmlFor="profession" fontSize={12}>
                Profession
              </FormLabel>
              <Input
                id="profession"
                type="text"
                placeholder="e.g. Software Developer"
                borderRadius={0}
                onChange={(c) => onChangeP(c)}
              />
            </FormControl>
            <Grid templateColumns="repeat(2, 1fr)" gap={10} marginBottom={8}>
              <GridItem w="100%">
                <FormControl>
                  <FormLabel htmlFor="city" fontSize={12}>
                    City/Municipality
                  </FormLabel>
                  <Input
                    id="city"
                    type="text"
                    placeholder="e.g. Istanbul"
                    borderRadius={0}
                    onChange={(c) => onChangeCi(c)}
                  />
                </FormControl>
              </GridItem>
              <GridItem w="100%">
                <Grid templateColumns="repeat(2, 1fr)" gap={10}>
                  <GridItem w="100%">
                    <FormControl>
                      <FormLabel htmlFor="country" fontSize={12}>
                        Country
                      </FormLabel>
                      <Input
                        id="country"
                        type="text"
                        placeholder="e.g. Silivri"
                        borderRadius={0}
                        onChange={(c) => onChangeCo(c)}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem w="100%">
                    <FormControl>
                      <FormLabel htmlFor="posta-code" fontSize={12}>
                        Postal Code
                      </FormLabel>
                      <Input
                        id="posta-code"
                        type="text"
                        placeholder="e.g. 34570"
                        borderRadius={0}
                        onChange={(c) => onChangePC(c)}
                      />
                    </FormControl>
                  </GridItem>
                </Grid>
              </GridItem>
            </Grid>
            <Grid templateColumns="repeat(2, 1fr)" gap={10} marginBottom={8}>
              <GridItem w="100%">
                <FormControl>
                  <FormLabel htmlFor="phone" fontSize={12}>
                    Phone
                  </FormLabel>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="e.g. +90 541 000 00 00"
                    borderRadius={0}
                    onChange={(c) => onChangePh(c)}
                  />
                </FormControl>
              </GridItem>
              <GridItem w="100%">
                <FormControl>
                  <FormLabel htmlFor="email" fontSize={12}>
                    Email
                  </FormLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="e.g. info@meraklicoder.com"
                    borderRadius={0}
                    onChange={(c) => onChangeE(c)}
                  />
                </FormControl>
              </GridItem>
            </Grid>
          </Step>
          <Step label="User About">
            <FormControl marginBottom={8}>
              <FormLabel htmlFor="profession" fontSize={12}>
                Profession
              </FormLabel>
              <Textarea
                id="profession"
                placeholder="e.g. I've been a software developer for 10 years."
                borderRadius={0}
                onChange={(c) => onChangeAb(c)}
                maxLength={1500}
              />
            </FormControl>
            <div className="tags-input-container">
              <>
                {skills.map((skill) => {
                  return (
                    <div className="tag-item" key={skill.id}>
                      <span className="text">{skill.title}</span>
                      <span
                        className="close"
                        onClick={() => deleteSkill(skill.id)}
                      >
                        &times;
                      </span>
                    </div>
                  );
                })}
              </>
              <input
                onKeyDown={handleKeyDown}
                type="text"
                className="tags-input"
                placeholder="Add Skill e.g. Web Design"
              />
            </div>
          </Step>
          <Step label="Preview">
            <div id="doc2" className="yui-t7" ref={ref}>
              <div id="inner">
                <div id="hd">
                  <div className="yui-gc">
                    <div className="yui-u first">
                      <h1>{firstName + " " + lastName}</h1>
                      <h2>{profession}</h2>
                    </div>

                    <div className="yui-u">
                      <div className="contact-info">
                        <h3>
                          <a href={"mailto:" + email}>{email}</a>
                        </h3>
                        <h3>{phone}</h3>
                        <h3>{city + "/" + country + "||" + postalCode}</h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="bd">
                  <div id="yui-main">
                    <div className="yui-b">
                      <div className="yui-gf">
                        <div className="yui-u first">
                          <h2>About</h2>
                        </div>
                        <div className="yui-u">
                          <p className="enlarge">{about}</p>
                        </div>
                      </div>
                      <div className="yui-gf">
                        <div className="yui-u first">
                          <h2>Skills</h2>
                        </div>
                        <div className="yui-u">
                          <>
                            {skills.map((skill) => {
                              return (
                                <div className="talent" key={skill.title}>
                                  <h2>{skill.title}</h2>
                                </div>
                              );
                            })}
                          </>
                        </div>
                      </div>

                      <div className="yui-gf">
                        <div className="yui-u first">
                          <h2>Technical</h2>
                        </div>
                        <div className="yui-u">
                          <ul className="talent">
                            <li>XHTML</li>
                            <li>CSS</li>
                            <li className="last">Javascript</li>
                          </ul>

                          <ul className="talent">
                            <li>Jquery</li>
                            <li>PHP</li>
                            <li className="last">CVS / Subversion</li>
                          </ul>

                          <ul className="talent">
                            <li>OS X</li>
                            <li>Windows XP/Vista</li>
                            <li className="last">Linux</li>
                          </ul>
                        </div>
                      </div>

                      <div className="yui-gf">
                        <div className="yui-u first">
                          <h2>Experience</h2>
                        </div>

                        <div className="yui-u">
                          <div className="job">
                            <h2>Facebook</h2>
                            <h3>Senior Interface Designer</h3>
                            <h4>2005-2007</h4>
                            <p>
                              Intrinsicly enable optimal core competencies
                              through corporate relationships. Phosfluorescently
                              implement worldwide vortals and client-focused
                              imperatives. Conveniently initiate virtual
                              paradigms and top-line convergence.
                            </p>
                          </div>

                          <div className="job">
                            <h2>Apple Inc.</h2>
                            <h3>Senior Interface Designer</h3>
                            <h4>2005-2007</h4>
                            <p>
                              Progressively reconceptualize multifunctional
                              "outside the box" thinking through inexpensive
                              methods of empowerment. Compellingly morph
                              extensive niche markets with mission-critical
                              ideas. Phosfluorescently deliver bricks-and-clicks
                              strategic theme areas rather than scalable
                              benefits.
                            </p>
                          </div>

                          <div className="job">
                            <h2>Microsoft</h2>
                            <h3>Principal and Creative Lead</h3>
                            <h4>2004-2005</h4>
                            <p>
                              Intrinsicly transform flexible manufactured
                              products without excellent intellectual capital.
                              Energistically evisculate orthogonal architectures
                              through covalent action items. Assertively
                              incentivize sticky platforms without synergistic
                              materials.
                            </p>
                          </div>

                          <div className="job last">
                            <h2>International Business Machines (IBM)</h2>
                            <h3>Lead Web Designer</h3>
                            <h4>2001-2004</h4>
                            <p>
                              Globally re-engineer cross-media schemas through
                              viral methods of empowerment. Proactively grow
                              long-term high-impact human capital and highly
                              efficient innovation. Intrinsicly iterate
                              excellent e-tailers with timely e-markets.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="yui-gf last">
                        <div className="yui-u first">
                          <h2>Education</h2>
                        </div>
                        <div className="yui-u">
                          <h2>Indiana University - Bloomington, Indiana</h2>
                          <h3>
                            Dual Major, Economics and English &mdash;
                            <strong>4.0 GPA</strong>
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="ft">
                  <p>
                    {firstName + " " + lastName} &mdash;
                    <a href={"mailto:" + email}>{email}</a>
                    &mdash; {phone}
                  </p>
                </div>
              </div>
            </div>
            <div className="download">
              <Button
                w="20%"
                bg="#6c63ff"
                color="#fff"
                _hover={{ bg: "#837dff" }}
                _active={{ bg: "#aeaaff" }}
                onClick={downloadPng}
              >
                Download CV (PNG)
              </Button>
              <Pdf
                targetRef={ref}
                filename={`${getFileName("pdf")}`}
                x={-5}
                y={-13}
                scale={0.55}
              >
                {({ toPdf }: any) => (
                  <Button
                    w="20%"
                    bg="#6c63ff"
                    ml={10}
                    color="#fff"
                    _hover={{ bg: "#837dff" }}
                    _active={{ bg: "#aeaaff" }}
                    onClick={toPdf}
                  >
                    Download CV (PDF)
                  </Button>
                )}
              </Pdf>
            </div>
          </Step>
        </Steps>
        {activeStep === steps.length ? (
          <Flex px={4} py={4} width="100%" flexDirection="column">
            <Heading fontSize="xl" textAlign="center">
              Woohoo! All steps completed!
            </Heading>
            <Button mx="auto" mt={6} size="sm" onClick={reset}>
              Reset
            </Button>
          </Flex>
        ) : (
          <Flex width="100%" justify="flex-end">
            <Button
              isDisabled={activeStep === 0}
              mr={4}
              onClick={prevStep}
              size="sm"
              variant="ghost"
            >
              Prev
            </Button>
            <Button size="sm" onClick={nextStep}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Flex>
        )}
      </Flex>
    </div>
  );
}

export default ResumeBuilder;

import { Result } from "postcss";

export const generateString = (stringLength) => {
    const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris at aliquam nunc, hendrerit ornare eros. Nunc blandit aliquet lobortis. Proin consequat mauris consequat velit dictum rutrum. Nulla ac semper lectus. Nullam tortor diam, volutpat et convallis blandit, commodo id purus. Ut varius mi in velit finibus, sed efficitur erat tristique. Nunc et diam vestibulum, sagittis ligula fringilla, bibendum orci. Mauris eget dui faucibus, tristique dui sit amet, egestas sapien. Sed placerat malesuada ipsum id vulputate. Aliquam maximus mi sed nibh gravida mattis. Nam in mattis ligula. Proin non ante at tortor tincidunt varius. Suspendisse sit amet sapien sed magna varius maximus. Maecenas sollicitudin velit id urna vestibulum, in condimentum quam lacinia. Suspendisse sed purus quis tortor rutrum pulvinar. Pellentesque maximus nunc neque. Mauris finibus aliquam ex, euismod suscipit sem congue in. Mauris eu vestibulum elit. Fusce eu aliquam libero. Suspendisse lacinia turpis a lacinia semper. Cras scelerisque augue ac quam dictum laoreet. Aenean luctus ligula sed justo placerat ultricies mollis nec ante. Quisque vestibulum eget velit id efficitur. Aenean ut varius nulla, a porta massa. Sed vulputate a massa a sollicitudin. Etiam elit nulla, efficitur ut sapien vel, pulvinar pellentesque augue. Cras at dignissim lorem. Quisque convallis urna ut ipsum viverra, eu molestie felis blandit. Phasellus vel enim ac lectus tempor viverra. Fusce non elit ut lectus ullamcorper consequat. Integer ultricies blandit arcu. Nunc faucibus nisl lorem, at malesuada felis hendrerit et. Cras tincidunt enim in ligula tincidunt maximus. In at ipsum nisi. Maecenas blandit dignissim ornare. Donec imperdiet ante ex, at accumsan turpis accumsan nec. Nam et metus id lacus pulvinar iaculis nec at sem. Nunc quis sapien a nulla venenatis viverra. Praesent id massa eu velit porttitor tristique. Phasellus porttitor gravida risus. Morbi semper dignissim ultricies. Donec tempus at ex sed aliquam. Cras risus libero, viverra id justo vel, mollis feugiat dolor. Aenean pretium et nulla vel aliquet. Proin sagittis, quam at ornare tempor, nibh tellus rutrum dui, at pharetra sem lorem vel justo. Nunc ligula nunc, consequat tincidunt finibus ac, rutrum eu libero. Donec non arcu id felis viverra pretium faucibus at ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum velit ex, rhoncus sit amet molestie eget, luctus ac nibh. Fusce placerat in purus nec placerat. Mauris sit amet scelerisque tortor, et varius nisi. Nulla facilisi. Pellentesque non quam at lectus varius cursus. Mauris pulvinar in eros non scelerisque. Integer faucibus lorem vel libero interdum scelerisque. Praesent sit amet est sodales, sagittis purus vel, pulvinar ex. Integer sit amet ipsum ac lacus rhoncus auctor. In hac habitasse platea dictumst. Morbi sodales, purus eget placerat viverra, eros ante congue neque, vel facilisis augue nulla a metus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam a ex quam. Maecenas imperdiet massa sed risus viverra convallis. Donec congue, justo nec malesuada ultrices, libero arcu cursus nisi, quis vulputate ipsum leo et ante. Nunc accumsan in est et lacinia. Suspendisse ut odio vehicula, euismod enim non, porta ex. Mauris ac porttitor quam. Fusce in velit et dui sagittis consectetur. Integer pretium maximus lorem, ut accumsan ex vehicula ut. Cras molestie, massa a maximus dictum, magna sem porta nisi, a convallis tortor risus quis quam. In porta fermentum varius. Aenean non ornare erat.'
    
    let randomStartNum;
    let randomEndNum;

    if (stringLength > lorem.length) {
        randomStartNum = 0;
        randomEndNum = lorem.length;
    } else {
        randomStartNum = Math.floor(Math.random() * (lorem.length - stringLength));
        randomEndNum = stringLength ? randomStartNum + stringLength : randomStartNum + 50;
    }

    function getRandomString() {
        
        if (randomEndNum - randomStartNum > stringLength && randomEndNum - randomStartNum <= 5) {
            getRandomString();
        } else {
            let result = lorem.slice(randomStartNum + 1, randomEndNum);
            
            if (result.slice(0, 1) === ',' || result.slice(0, 1) === '.' || result.slice(0, 1) === ' ') {
                result = result.replace(result.slice(0, 1), '');
            }

            let upperLetter = result.slice(0, 1).toUpperCase();
            result = upperLetter + result.slice(1, result.length);
            return result;
        }
    }

    return getRandomString();
}